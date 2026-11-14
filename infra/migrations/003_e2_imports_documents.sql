-- E2: import batches, immutable source documents, NF-e headers/items.
-- No tax calculation rules.

CREATE TABLE import_batches (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       UUID NOT NULL REFERENCES organizations (id) ON DELETE CASCADE,
  company_id      UUID NOT NULL REFERENCES companies (id) ON DELETE CASCADE,
  direction       TEXT NOT NULL CHECK (direction IN ('entry', 'exit')),
  status          TEXT NOT NULL DEFAULT 'processing'
                    CHECK (status IN ('processing', 'completed', 'completed_with_errors', 'failed')),
  original_filename TEXT,
  content_type    TEXT,
  created_by      UUID REFERENCES users (id),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  finished_at     TIMESTAMPTZ
);

CREATE INDEX import_batches_tenant_company_idx
  ON import_batches (tenant_id, company_id, created_at DESC);

CREATE TABLE source_documents (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       UUID NOT NULL REFERENCES organizations (id) ON DELETE CASCADE,
  company_id      UUID NOT NULL REFERENCES companies (id) ON DELETE CASCADE,
  batch_id        UUID REFERENCES import_batches (id) ON DELETE SET NULL,
  direction       TEXT NOT NULL CHECK (direction IN ('entry', 'exit')),
  access_key      TEXT,
  sha256          TEXT NOT NULL,
  byte_size       INTEGER NOT NULL CHECK (byte_size >= 0),
  original_filename TEXT NOT NULL,
  storage_path    TEXT NOT NULL,
  content_type    TEXT NOT NULL DEFAULT 'application/xml',
  status          TEXT NOT NULL
                    CHECK (status IN (
                      'stored', 'parsed', 'duplicate', 'variant_quarantine',
                      'rejected', 'unsupported_model'
                    )),
  rejection_reason TEXT,
  created_by      UUID REFERENCES users (id),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (tenant_id, company_id, sha256)
);

CREATE INDEX source_documents_access_key_idx
  ON source_documents (tenant_id, company_id, access_key);

CREATE TABLE invoice_headers (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       UUID NOT NULL REFERENCES organizations (id) ON DELETE CASCADE,
  company_id      UUID NOT NULL REFERENCES companies (id) ON DELETE CASCADE,
  source_document_id UUID NOT NULL UNIQUE REFERENCES source_documents (id) ON DELETE CASCADE,
  access_key      TEXT NOT NULL,
  model           TEXT NOT NULL,
  series          TEXT,
  number          TEXT,
  issued_at       TIMESTAMPTZ,
  nature          TEXT,
  tp_nf           TEXT,
  id_dest         TEXT,
  fin_nfe         TEXT,
  emit_cnpj       TEXT,
  emit_name       TEXT,
  emit_uf         CHAR(2),
  dest_cnpj       TEXT,
  dest_name       TEXT,
  dest_uf         CHAR(2),
  protocol_number TEXT,
  authorization_status TEXT NOT NULL DEFAULT 'unknown'
                    CHECK (authorization_status IN (
                      'authorized_in_xml', 'without_protocol', 'unknown'
                    )),
  triage          TEXT NOT NULL DEFAULT 'entry_candidate'
                    CHECK (triage IN (
                      'entry_candidate', 'unsupported_model', 'special_operation', 'needs_review'
                    )),
  raw_summary     JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (tenant_id, company_id, access_key)
);

CREATE TABLE invoice_items (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       UUID NOT NULL REFERENCES organizations (id) ON DELETE CASCADE,
  company_id      UUID NOT NULL REFERENCES companies (id) ON DELETE CASCADE,
  invoice_id      UUID NOT NULL REFERENCES invoice_headers (id) ON DELETE CASCADE,
  item_number     INTEGER NOT NULL,
  product_code    TEXT,
  description     TEXT,
  ncm             TEXT,
  cest            TEXT,
  gtin            TEXT,
  cfop_issuer     TEXT,
  quantity        NUMERIC(18, 6),
  unit_price      NUMERIC(18, 6),
  product_value   NUMERIC(18, 2),
  discount_value  NUMERIC(18, 2),
  freight_value   NUMERIC(18, 2),
  other_value     NUMERIC(18, 2),
  icms_cst_csosn  TEXT,
  icms_origin     TEXT,
  icms_base       NUMERIC(18, 2),
  icms_rate       NUMERIC(18, 6),
  icms_value      NUMERIC(18, 2),
  raw_fields      JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (invoice_id, item_number)
);

CREATE INDEX invoice_items_invoice_idx ON invoice_items (invoice_id);

CREATE TABLE import_errors (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       UUID NOT NULL REFERENCES organizations (id) ON DELETE CASCADE,
  batch_id        UUID NOT NULL REFERENCES import_batches (id) ON DELETE CASCADE,
  filename        TEXT,
  code            TEXT NOT NULL,
  message         TEXT NOT NULL,
  detail          JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX import_errors_batch_idx ON import_errors (batch_id);

COMMENT ON TABLE source_documents IS 'Immutable originals: bytes on disk, SHA-256 in DB. Never rewrite.';
COMMENT ON COLUMN source_documents.storage_path IS 'Relative path under private storage root; original bytes unchanged.';
