-- E1: sessions, trial CNPJ slots, entry NF-e usage, tax/activity profiles.
-- No tax rates or calculation rules.

CREATE TABLE sessions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  token_hash      TEXT NOT NULL UNIQUE,
  expires_at      TIMESTAMPTZ NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX sessions_user_id_idx ON sessions (user_id);
CREATE INDEX sessions_expires_at_idx ON sessions (expires_at);

-- Lifetime trial binding: archiving a company does NOT free a slot.
CREATE TABLE trial_company_slots (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       UUID NOT NULL REFERENCES organizations (id) ON DELETE CASCADE,
  company_id      UUID NOT NULL REFERENCES companies (id) ON DELETE RESTRICT,
  cnpj            TEXT NOT NULL CHECK (char_length(cnpj) = 14),
  bound_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (tenant_id, cnpj),
  UNIQUE (company_id)
);

CREATE INDEX trial_company_slots_tenant_id_idx ON trial_company_slots (tenant_id);

-- Entry NF-e quota ledger (E2 will commit real keys; E1 exposes reserve API).
CREATE TABLE entry_invoice_usage (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       UUID NOT NULL REFERENCES organizations (id) ON DELETE CASCADE,
  company_id      UUID NOT NULL REFERENCES companies (id) ON DELETE CASCADE,
  access_key      TEXT NOT NULL CHECK (char_length(access_key) BETWEEN 1 AND 64),
  status          TEXT NOT NULL
                    CHECK (status IN ('reserved', 'committed', 'released')),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX entry_invoice_usage_active_uq
  ON entry_invoice_usage (tenant_id, company_id, access_key)
  WHERE status IN ('reserved', 'committed');

CREATE INDEX entry_invoice_usage_company_status_idx
  ON entry_invoice_usage (company_id, status);

CREATE TABLE company_tax_profiles (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       UUID NOT NULL REFERENCES organizations (id) ON DELETE CASCADE,
  company_id      UUID NOT NULL REFERENCES companies (id) ON DELETE CASCADE,
  regime          TEXT NOT NULL
                    CHECK (regime IN ('simples_nacional', 'regime_normal', 'outro', 'nao_sei')),
  icms_taxpayer   TEXT NOT NULL
                    CHECK (icms_taxpayer IN ('contribuinte', 'nao_contribuinte', 'nao_sei')),
  main_cnae       TEXT,
  secondary_cnaes TEXT[] NOT NULL DEFAULT '{}',
  effective_from  DATE NOT NULL DEFAULT CURRENT_DATE,
  effective_to    DATE,
  source          TEXT NOT NULL DEFAULT 'manual_user'
                    CHECK (source IN ('manual_user', 'cnpj_card', 'external_api')),
  created_by      UUID REFERENCES users (id),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (effective_to IS NULL OR effective_to >= effective_from)
);

CREATE INDEX company_tax_profiles_company_idx
  ON company_tax_profiles (company_id, effective_from DESC);

CREATE TABLE company_activity_profiles (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       UUID NOT NULL REFERENCES organizations (id) ON DELETE CASCADE,
  company_id      UUID NOT NULL REFERENCES companies (id) ON DELETE CASCADE,
  sectors         TEXT[] NOT NULL DEFAULT '{}',
  answers         JSONB NOT NULL DEFAULT '{}'::jsonb,
  effective_from  DATE NOT NULL DEFAULT CURRENT_DATE,
  effective_to    DATE,
  created_by      UUID REFERENCES users (id),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (effective_to IS NULL OR effective_to >= effective_from)
);

CREATE INDEX company_activity_profiles_company_idx
  ON company_activity_profiles (company_id, effective_from DESC);

CREATE TABLE audit_events (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       UUID REFERENCES organizations (id) ON DELETE SET NULL,
  actor_user_id   UUID REFERENCES users (id) ON DELETE SET NULL,
  action          TEXT NOT NULL,
  entity_type     TEXT,
  entity_id       TEXT,
  detail          JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX audit_events_tenant_created_idx ON audit_events (tenant_id, created_at DESC);

COMMENT ON TABLE trial_company_slots IS 'Trial CNPJ slots (max 3/org). Slots are not freed by archive.';
COMMENT ON TABLE entry_invoice_usage IS 'Trial entry NF-e usage (max 5 committed/reserved per company).';
COMMENT ON TABLE company_tax_profiles IS 'Versioned tax profile by competence — no rates stored as product rules.';
