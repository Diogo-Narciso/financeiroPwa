-- E6: plans, subscriptions, billing events, contracts.
-- Paid prices stay NULL / unpublished until commercial + legal approval.
-- Placeholders are explicitly labeled — not official commercial prices.

CREATE TABLE plans (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code            TEXT NOT NULL UNIQUE,
  name            TEXT NOT NULL,
  kind            TEXT NOT NULL CHECK (kind IN ('trial', 'paid', 'negotiated')),
  publishable     BOOLEAN NOT NULL DEFAULT FALSE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE plan_versions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id         UUID NOT NULL REFERENCES plans (id) ON DELETE CASCADE,
  version_label   TEXT NOT NULL,
  status          TEXT NOT NULL
                    CHECK (status IN ('draft', 'approved', 'retired')),
  -- NULL = no official price. Placeholder cents are only for sandbox UI when
  -- is_price_placeholder = TRUE and must not be published as official.
  price_monthly_cents INTEGER,
  is_price_placeholder BOOLEAN NOT NULL DEFAULT FALSE,
  currency        TEXT NOT NULL DEFAULT 'BRL',
  commitment_months INTEGER,
  billing_interval TEXT NOT NULL
                    CHECK (billing_interval IN ('monthly', 'prepaid_term', 'none')),
  limits          JSONB NOT NULL DEFAULT '{}'::jsonb,
  notes           TEXT NOT NULL DEFAULT '',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (plan_id, version_label)
);

CREATE TABLE subscriptions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       UUID NOT NULL REFERENCES organizations (id) ON DELETE CASCADE,
  plan_version_id UUID NOT NULL REFERENCES plan_versions (id),
  status          TEXT NOT NULL
                    CHECK (status IN (
                      'trialing', 'active', 'past_due', 'canceled', 'unpaid', 'incomplete'
                    )),
  contract_mode   TEXT NOT NULL
                    CHECK (contract_mode IN (
                      'monthly_flexible', 'six_month_commitment',
                      'annual_commitment', 'negotiated', 'trial'
                    )),
  current_period_start TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  current_period_end   TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN NOT NULL DEFAULT FALSE,
  external_ref    TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (tenant_id)
);

CREATE TABLE billing_events (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       UUID REFERENCES organizations (id) ON DELETE SET NULL,
  subscription_id UUID REFERENCES subscriptions (id) ON DELETE SET NULL,
  provider        TEXT NOT NULL DEFAULT 'mock_sandbox',
  event_type      TEXT NOT NULL,
  idempotency_key TEXT NOT NULL UNIQUE,
  payload         JSONB NOT NULL DEFAULT '{}'::jsonb,
  processed_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX billing_events_subscription_idx ON billing_events (subscription_id, processed_at DESC);

CREATE TABLE contract_templates (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code            TEXT NOT NULL UNIQUE,
  title           TEXT NOT NULL,
  legal_review_status TEXT NOT NULL DEFAULT 'pending'
                    CHECK (legal_review_status IN ('pending', 'approved', 'rejected')),
  body_markdown   TEXT NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE customer_contracts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       UUID NOT NULL REFERENCES organizations (id) ON DELETE CASCADE,
  template_id     UUID NOT NULL REFERENCES contract_templates (id),
  subscription_id UUID REFERENCES subscriptions (id),
  status          TEXT NOT NULL
                    CHECK (status IN ('draft', 'accepted', 'superseded', 'canceled')),
  -- Immutable snapshot at acceptance time (template body + terms).
  immutable_snapshot JSONB NOT NULL,
  accepted_at     TIMESTAMPTZ,
  accepted_by     UUID REFERENCES users (id),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE renewal_events (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id UUID NOT NULL REFERENCES subscriptions (id) ON DELETE CASCADE,
  policy          TEXT NOT NULL
                    CHECK (policy IN (
                      'continuous_service_without_new_commitment',
                      'fixed_term_auto_renewal_reviewed'
                    )),
  enabled         BOOLEAN NOT NULL DEFAULT FALSE,
  notes           TEXT NOT NULL DEFAULT 'Política de prazo fixo bloqueada até revisão jurídica.',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE cancellation_requests (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       UUID NOT NULL REFERENCES organizations (id) ON DELETE CASCADE,
  subscription_id UUID NOT NULL REFERENCES subscriptions (id),
  reason          TEXT NOT NULL,
  fee_policy_status TEXT NOT NULL DEFAULT 'pending_legal_approval',
  status          TEXT NOT NULL DEFAULT 'received'
                    CHECK (status IN ('received', 'processing', 'completed', 'blocked')),
  created_by      UUID REFERENCES users (id),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO plans (code, name, kind, publishable) VALUES
  ('trial', 'Teste gratuito', 'trial', TRUE),
  ('inicial', 'Inicial', 'paid', FALSE),
  ('escritorio', 'Escritorio', 'paid', FALSE),
  ('profissional', 'Profissional', 'paid', FALSE),
  ('empresarial', 'Empresarial', 'paid', FALSE);

INSERT INTO plan_versions (
  plan_id, version_label, status, price_monthly_cents, is_price_placeholder,
  commitment_months, billing_interval, limits, notes
)
SELECT id, 'v1', 'approved', NULL, FALSE, NULL, 'none',
       '{"max_companies":3,"max_entry_invoices_per_company":5}'::jsonb,
       'Trial — sem cartão; quotas E1. Sem conversão automática para pago.'
FROM plans WHERE code = 'trial';

-- Paid drafts: placeholder cents for sandbox UI only — NOT official / not publishable.
INSERT INTO plan_versions (
  plan_id, version_label, status, price_monthly_cents, is_price_placeholder,
  commitment_months, billing_interval, limits, notes
)
SELECT id, 'v1-draft', 'draft',
       CASE code
         WHEN 'inicial' THEN 9900
         WHEN 'escritorio' THEN 19900
         WHEN 'profissional' THEN 39900
         WHEN 'empresarial' THEN 79900
       END,
       TRUE,
       CASE WHEN code IN ('profissional', 'empresarial') THEN 12 ELSE 1 END,
       'monthly',
       '{}'::jsonb,
       'PLACEHOLDER — não é preço oficial. offers_publishable=false. Não contratar em produção.'
FROM plans WHERE kind = 'paid';

INSERT INTO contract_templates (code, title, legal_review_status, body_markdown) VALUES
(
  'terms_trial_v1',
  'Termos do teste gratuito (rascunho)',
  'pending',
  $md$
# Termos do teste gratuito (rascunho)

Documento **pendente de revisão jurídica**.

- Quotas: até 3 CNPJs e 5 NF-e de entrada por CNPJ.
- Sem cartão e sem conversão automática para plano pago.
- Renovação padrão: continuidade sem nova fidelidade; renovação por prazo fixo **bloqueada** até revisão.
- Multas/cancelamento: política pendente de aprovação legal.
$md$
),
(
  'terms_paid_placeholder_v1',
  'Termos de plano pago (placeholder)',
  'pending',
  $md$
# Termos de plano pago (placeholder)

**Não publicar.** Preços e cláusulas comerciais ainda não aprovados.
Prazo mínimo e renovação exigem revisão jurídica explícita.
$md$
);

COMMENT ON TABLE plan_versions IS 'Official paid prices require approval; placeholders must set is_price_placeholder=true.';
COMMENT ON TABLE billing_events IS 'Idempotent via unique idempotency_key (mock_sandbox provider).';
COMMENT ON TABLE customer_contracts IS 'Accepted contracts store immutable_snapshot; do not rewrite.';
