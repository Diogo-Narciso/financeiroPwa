-- E3: classification suggestions, decisions, retention flags, manual tax choices.
-- No tax rates or calculated DIFAL amounts as homologated rules.

CREATE TABLE item_classification_suggestions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       UUID NOT NULL REFERENCES organizations (id) ON DELETE CASCADE,
  company_id      UUID NOT NULL REFERENCES companies (id) ON DELETE CASCADE,
  invoice_item_id UUID NOT NULL UNIQUE REFERENCES invoice_items (id) ON DELETE CASCADE,
  purpose         TEXT NOT NULL
                    CHECK (purpose IN (
                      'revenda', 'industrializacao_insumo', 'embalagem',
                      'uso_consumo', 'ativo_imobilizado', 'outras_operacoes', 'indeterminado'
                    )),
  confidence      TEXT NOT NULL CHECK (confidence IN ('alto', 'medio', 'baixo')),
  reasons         JSONB NOT NULL DEFAULT '[]'::jsonb,
  engine_version  TEXT NOT NULL DEFAULT 'classifier-e3-v1',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE item_classification_decisions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       UUID NOT NULL REFERENCES organizations (id) ON DELETE CASCADE,
  company_id      UUID NOT NULL REFERENCES companies (id) ON DELETE CASCADE,
  invoice_item_id UUID NOT NULL REFERENCES invoice_items (id) ON DELETE CASCADE,
  purpose         TEXT NOT NULL
                    CHECK (purpose IN (
                      'revenda', 'industrializacao_insumo', 'embalagem',
                      'uso_consumo', 'ativo_imobilizado', 'outras_operacoes', 'indeterminado'
                    )),
  source          TEXT NOT NULL CHECK (source IN ('system_accepted', 'user_override')),
  suggestion_id   UUID REFERENCES item_classification_suggestions (id),
  reason          TEXT,
  decided_by      UUID REFERENCES users (id),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX item_classification_decisions_item_idx
  ON item_classification_decisions (invoice_item_id, created_at DESC);

-- ST/retention triage flags only — no invented DIFAL amounts.
CREATE TABLE item_retention_assessments (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       UUID NOT NULL REFERENCES organizations (id) ON DELETE CASCADE,
  company_id      UUID NOT NULL REFERENCES companies (id) ON DELETE CASCADE,
  invoice_item_id UUID NOT NULL UNIQUE REFERENCES invoice_items (id) ON DELETE CASCADE,
  status          TEXT NOT NULL
                    CHECK (status IN (
                      'sem_indicio',
                      'retencao_identificada_a_conferir',
                      'pendente'
                    )),
  flags           JSONB NOT NULL DEFAULT '{}'::jsonb,
  warning_text    TEXT,
  engine_version  TEXT NOT NULL DEFAULT 'retention-e3-v1',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE manual_tax_decisions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       UUID NOT NULL REFERENCES organizations (id) ON DELETE CASCADE,
  company_id      UUID NOT NULL REFERENCES companies (id) ON DELETE CASCADE,
  invoice_item_id UUID NOT NULL REFERENCES invoice_items (id) ON DELETE CASCADE,
  action          TEXT NOT NULL
                    CHECK (action IN (
                      'follow_system', 'include_difal', 'exclude_difal', 'return_to_system_analysis'
                    )),
  reason          TEXT NOT NULL,
  -- Optional user-provided amounts stored as opaque strings; never treated as homologated rules.
  icms_difal_manual TEXT,
  fecp_manual       TEXT,
  tax_status      TEXT NOT NULL DEFAULT 'manual_user_choice',
  disclaimer      TEXT NOT NULL DEFAULT 'MANUAL — ESCOLHA DO USUÁRIO. Não constitui parecer fiscal homologado.',
  suggestion_snapshot JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_by      UUID REFERENCES users (id),
  revoked_at      TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (char_length(trim(reason)) > 0)
);

CREATE INDEX manual_tax_decisions_item_idx
  ON manual_tax_decisions (invoice_item_id, created_at DESC);

COMMENT ON TABLE item_classification_suggestions IS 'Automatic purpose suggestion; preserved when user overrides.';
COMMENT ON TABLE manual_tax_decisions IS 'Manual include/exclude DIFAL with motive; does not erase automatic analysis.';
COMMENT ON TABLE item_retention_assessments IS 'ST/retention flags from XML evidence only — no tax calculation.';
