-- E4: versioned tax rules / runs / benefits scaffolding.
-- Seeded rules are NOT homologated for production fiscal use.

CREATE TABLE tax_sources (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code            TEXT NOT NULL UNIQUE,
  title           TEXT NOT NULL,
  citation        TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE tax_rules (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code            TEXT NOT NULL UNIQUE,
  module          TEXT NOT NULL
                    CHECK (module IN (
                      'difal_aquisicao_consumidor_final_contribuinte',
                      'difal_venda_consumidor_final_nao_contribuinte'
                    )),
  title           TEXT NOT NULL,
  destination_uf  CHAR(2),
  enabled         BOOLEAN NOT NULL DEFAULT FALSE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE tax_rule_versions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tax_rule_id     UUID NOT NULL REFERENCES tax_rules (id) ON DELETE CASCADE,
  version_label   TEXT NOT NULL,
  status          TEXT NOT NULL
                    CHECK (status IN (
                      'draft', 'demo_arithmetic', 'pending_homologation', 'homologated', 'retired'
                    )),
  effective_from  DATE,
  effective_to    DATE,
  formula_key     TEXT NOT NULL,
  parameters      JSONB NOT NULL DEFAULT '{}'::jsonb,
  notes           TEXT NOT NULL DEFAULT '',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (tax_rule_id, version_label)
);

CREATE TABLE tax_benefits (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code            TEXT NOT NULL UNIQUE,
  title           TEXT NOT NULL,
  catalog_ref     TEXT,
  auto_apply      BOOLEAN NOT NULL DEFAULT FALSE,
  status          TEXT NOT NULL DEFAULT 'pending_homologation'
                    CHECK (status IN ('pending_homologation', 'demo', 'homologated', 'disabled')),
  conditions      JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE tax_runs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       UUID NOT NULL REFERENCES organizations (id) ON DELETE CASCADE,
  company_id      UUID NOT NULL REFERENCES companies (id) ON DELETE CASCADE,
  module          TEXT NOT NULL,
  status          TEXT NOT NULL
                    CHECK (status IN ('completed', 'completed_with_pendencies', 'failed')),
  rule_version_id UUID REFERENCES tax_rule_versions (id),
  engine_version  TEXT NOT NULL DEFAULT 'tax-engine-e4-v1',
  created_by      UUID REFERENCES users (id),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX tax_runs_company_idx ON tax_runs (tenant_id, company_id, created_at DESC);

CREATE TABLE tax_scenarios (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tax_run_id      UUID NOT NULL REFERENCES tax_runs (id) ON DELETE CASCADE,
  invoice_item_id UUID NOT NULL REFERENCES invoice_items (id) ON DELETE CASCADE,
  code            TEXT NOT NULL CHECK (code IN ('A_sem_beneficio', 'B_com_beneficio_condicionado')),
  label           TEXT NOT NULL,
  selected        BOOLEAN NOT NULL DEFAULT FALSE,
  benefit_id      UUID REFERENCES tax_benefits (id),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (tax_run_id, invoice_item_id, code)
);

CREATE TABLE tax_item_results (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tax_run_id      UUID NOT NULL REFERENCES tax_runs (id) ON DELETE CASCADE,
  invoice_item_id UUID NOT NULL REFERENCES invoice_items (id) ON DELETE CASCADE,
  scenario_id     UUID REFERENCES tax_scenarios (id) ON DELETE SET NULL,
  outcome         TEXT NOT NULL
                    CHECK (outcome IN (
                      'pending_validation',
                      'fora_do_escopo_homologado',
                      'demo_arithmetic_only',
                      'module_disabled'
                    )),
  icms_difal      NUMERIC(18, 2),
  fecp            NUMERIC(18, 2),
  total           NUMERIC(18, 2),
  base            NUMERIC(18, 6),
  currency        TEXT NOT NULL DEFAULT 'BRL',
  pending_fields  JSONB NOT NULL DEFAULT '[]'::jsonb,
  message         TEXT NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX tax_item_results_run_idx ON tax_item_results (tax_run_id);

CREATE TABLE tax_calculation_steps (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tax_item_result_id UUID NOT NULL REFERENCES tax_item_results (id) ON DELETE CASCADE,
  step_order      INTEGER NOT NULL,
  label           TEXT NOT NULL,
  expression      TEXT,
  value           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed: acquisition module structure enabled=false until homologation;
-- sales-to-non-contributor module present but disabled permanently for MVP.
INSERT INTO tax_sources (code, title, citation) VALUES
  ('DEMO_ARITHMETIC', 'Casos aritméticos de demonstração', 'docs/apoio/CASOS_ARITMETICOS_DEMONSTRACAO.json'),
  ('PENDING_UF_RJ', 'Regras RJ a homologar', NULL);

INSERT INTO tax_rules (code, module, title, destination_uf, enabled) VALUES
  (
    'DIFAL_AQ_CONTRIB_RJ',
    'difal_aquisicao_consumidor_final_contribuinte',
    'DIFAL aquisição uso/consumo ou ativo por contribuinte (RJ) — pendente homologação',
    'RJ',
    FALSE
  ),
  (
    'DIFAL_VENDA_NAO_CONTRIB',
    'difal_venda_consumidor_final_nao_contribuinte',
    'DIFAL venda a não contribuinte — módulo desabilitado no MVP',
    NULL,
    FALSE
  );

INSERT INTO tax_rule_versions (tax_rule_id, version_label, status, formula_key, parameters, notes)
SELECT id, 'demo-arit-v1', 'demo_arithmetic', 'illustrative_gross_up_difal',
       '{"source":"CASOS_ARITMETICOS_DEMONSTRACAO","automatic_fiscal_application_enabled":false}'::jsonb,
       'Apenas aritmética demonstrativa. Não ativa cálculo fiscal de produção.'
FROM tax_rules WHERE code = 'DIFAL_AQ_CONTRIB_RJ';

INSERT INTO tax_rule_versions (tax_rule_id, version_label, status, formula_key, parameters, notes)
SELECT id, 'disabled-mvp', 'retired', 'disabled',
       '{}'::jsonb,
       'Módulo de venda a não contribuinte permanece desabilitado.'
FROM tax_rules WHERE code = 'DIFAL_VENDA_NAO_CONTRIB';

INSERT INTO tax_benefits (code, title, catalog_ref, auto_apply, status, conditions) VALUES
  (
    'CONV_52_91_SCAFFOLD',
    'Convênio ICMS 52/91 — biblioteca (scaffold)',
    'docs/apoio/BASE_EXEMPLOS_CONVENIO_52_91_V1_2.json',
    FALSE,
    'pending_homologation',
    '{"ncm_only_insufficient":true,"seed_automatic_fiscal_application_enabled":false}'::jsonb
  );

COMMENT ON TABLE tax_rule_versions IS 'Homologated status required before production fiscal amounts.';
COMMENT ON TABLE tax_item_results IS 'Missing homologated rule => pending_validation / fora_do_escopo — never silent zero as non-incidence.';
