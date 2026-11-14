-- E5: bookkeeping CFOP decisions + export jobs/manifests.
-- Never mutate authorized XML originals.

CREATE TABLE item_bookkeeping_cfop (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       UUID NOT NULL REFERENCES organizations (id) ON DELETE CASCADE,
  company_id      UUID NOT NULL REFERENCES companies (id) ON DELETE CASCADE,
  invoice_item_id UUID NOT NULL REFERENCES invoice_items (id) ON DELETE CASCADE,
  issuer_cfop     TEXT,
  bookkeeping_cfop TEXT NOT NULL,
  reason          TEXT NOT NULL,
  approved_by     UUID REFERENCES users (id),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX item_bookkeeping_cfop_item_idx
  ON item_bookkeeping_cfop (invoice_item_id, created_at DESC);

CREATE TABLE export_jobs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       UUID NOT NULL REFERENCES organizations (id) ON DELETE CASCADE,
  company_id      UUID NOT NULL REFERENCES companies (id) ON DELETE CASCADE,
  status          TEXT NOT NULL DEFAULT 'completed'
                    CHECK (status IN ('processing', 'completed', 'failed')),
  storage_path    TEXT NOT NULL,
  sha256_zip      TEXT NOT NULL,
  created_by      UUID REFERENCES users (id),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE export_manifests (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  export_job_id   UUID NOT NULL UNIQUE REFERENCES export_jobs (id) ON DELETE CASCADE,
  manifest        JSONB NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE erp_adapters (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code            TEXT NOT NULL UNIQUE,
  title           TEXT NOT NULL,
  homologated     BOOLEAN NOT NULL DEFAULT FALSE,
  notes           TEXT NOT NULL DEFAULT 'Não homologado — sem importação real documentada.'
);

INSERT INTO erp_adapters (code, title, homologated, notes) VALUES
  ('generic_csv', 'Mapeamento genérico CSV', FALSE, 'Layout auxiliar genérico. ERP específico só após teste real.');

COMMENT ON TABLE item_bookkeeping_cfop IS 'issuer_cfop from XML is immutable; bookkeeping_cfop is auxiliary only.';
