-- E0 foundation: identity / tenancy scaffolding only.
-- No fiscal rules, rates, or calculation tables in this migration.

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE organizations (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  kind            TEXT NOT NULL
                    CHECK (kind IN ('accounting_firm', 'company', 'individual')),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE users (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email           TEXT NOT NULL UNIQUE,
  display_name    TEXT,
  password_hash   TEXT,
  email_verified_at TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE memberships (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       UUID NOT NULL REFERENCES organizations (id) ON DELETE CASCADE,
  user_id         UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  role            TEXT NOT NULL
                    CHECK (role IN (
                      'owner', 'admin', 'analyst', 'reviewer', 'billing', 'read_only'
                    )),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (tenant_id, user_id)
);

CREATE INDEX memberships_tenant_id_idx ON memberships (tenant_id);
CREATE INDEX memberships_user_id_idx ON memberships (user_id);

CREATE TABLE companies (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       UUID NOT NULL REFERENCES organizations (id) ON DELETE CASCADE,
  cnpj            TEXT NOT NULL CHECK (char_length(cnpj) = 14),
  legal_name      TEXT NOT NULL,
  trade_name      TEXT,
  uf              CHAR(2),
  municipality    TEXT,
  state_registration TEXT,
  archived_at     TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (tenant_id, cnpj)
);

CREATE INDEX companies_tenant_id_idx ON companies (tenant_id);

CREATE TABLE health_heartbeats (
  id              BIGSERIAL PRIMARY KEY,
  service         TEXT NOT NULL,
  status          TEXT NOT NULL CHECK (status IN ('ok', 'degraded', 'error')),
  detail          JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX health_heartbeats_created_at_idx ON health_heartbeats (created_at DESC);

COMMENT ON TABLE organizations IS 'Commercial tenant / organization boundary.';
COMMENT ON TABLE companies IS 'Establishments (CNPJ) belonging to a tenant. Quotas enforced in E1.';
COMMENT ON COLUMN companies.cnpj IS 'Normalized 14-char CNPJ text (zeros preserved; never NUMERIC).';
