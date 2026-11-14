-- E7: homologation & launch scaffolding.
-- Checklist and pendencies start pending — this migration does NOT approve launch.
-- Sources: docs/02_ENTREGAS_E_TESTES.md §3, docs/03_FONTES_E_PENDENCIAS.md §5.

CREATE TABLE environment_profiles (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code            TEXT NOT NULL UNIQUE
                    CHECK (code IN ('local', 'homologation', 'production')),
  label           TEXT NOT NULL,
  is_live_billing BOOLEAN NOT NULL DEFAULT FALSE,
  allows_homologated_fiscal BOOLEAN NOT NULL DEFAULT FALSE,
  notes           TEXT NOT NULL DEFAULT '',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE homologation_domains (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code            TEXT NOT NULL UNIQUE,
  title           TEXT NOT NULL,
  status          TEXT NOT NULL DEFAULT 'pending'
                    CHECK (status IN (
                      'pending', 'in_review', 'approved', 'blocked', 'not_applicable'
                    )),
  evidence_notes  TEXT NOT NULL DEFAULT '',
  approved_by     TEXT,
  approved_at     TIMESTAMPTZ,
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE launch_checklist_items (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code            TEXT NOT NULL UNIQUE,
  section         TEXT NOT NULL,
  title           TEXT NOT NULL,
  status          TEXT NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending', 'done', 'blocked', 'waived')),
  evidence        TEXT NOT NULL DEFAULT '',
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Activation blockers from docs/03 §5 (P01–P14).
CREATE TABLE activation_pendencies (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code            TEXT NOT NULL UNIQUE,
  title           TEXT NOT NULL,
  category        TEXT NOT NULL
                    CHECK (category IN (
                      'fiscal', 'legal', 'privacy', 'commercial',
                      'payment', 'erp', 'ops', 'security'
                    )),
  blocks          TEXT NOT NULL,
  status          TEXT NOT NULL DEFAULT 'open'
                    CHECK (status IN ('open', 'in_progress', 'resolved', 'accepted_risk')),
  owner_role      TEXT NOT NULL DEFAULT '',
  source_ref      TEXT NOT NULL DEFAULT 'docs/03_FONTES_E_PENDENCIAS.md',
  notes           TEXT NOT NULL DEFAULT '',
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE readiness_snapshots (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  generated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  payload         JSONB NOT NULL,
  launch_approved BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO environment_profiles (code, label, is_live_billing, allows_homologated_fiscal, notes) VALUES
  ('local', 'Desenvolvimento local', FALSE, FALSE,
   'Mock billing; regras demo_arithmetic / pending_homologation.'),
  ('homologation', 'Homologação', FALSE, FALSE,
   'Ambiente de aceite. Cobrança real e regras fiscais oficiais só após aprovação explícita.'),
  ('production', 'Produção', FALSE, FALSE,
   'Bloqueado até checklist de lançamento aprovado. is_live_billing=false por seed.');

INSERT INTO homologation_domains (code, title, status, evidence_notes) VALUES
  ('fiscal_rules_rj', 'Regras fiscais RJ (DIFAL/FECP)', 'pending',
   'Casos aritméticos são demonstração. Produção exige versões status=homologated com fonte/competência.'),
  ('benefit_library', 'Biblioteca Convênio 52/91', 'pending',
   'Amostra JSON desativada para aplicação automática.'),
  ('erp_adapters', 'Adaptadores ERP', 'pending',
   'Nenhum ERP marcado homologado sem importação real documentada.'),
  ('commercial_offers', 'Ofertas e preços comerciais', 'pending',
   'Preços placeholder E6 — não oficiais; publishable=false.'),
  ('legal_contracts', 'Contratos, renovação e multa', 'pending',
   'Templates pending legal review; fixed-term auto-renewal bloqueado.'),
  ('payment_provider', 'Provedor de pagamento real', 'pending',
   'Apenas mock_sandbox. Sem chaves de produção.'),
  ('security_privacy', 'Segurança e privacidade', 'in_review',
   'Isolamento multi-tenant e quotas no servidor existem; H01–H10 / P10 ainda precisam evidência formal.'),
  ('backup_restore', 'Backup e restauração', 'pending',
   'Script scaffold scripts/e7-backup-restore-drill.sh — ensaio obrigatório antes do go-live.'),
  ('ops_support', 'Operação e suporte', 'pending',
   'Runbook e canais de suporte ainda não definidos operacionalmente.');

INSERT INTO launch_checklist_items (code, section, title, status) VALUES
  ('L01', 'produto', 'Fluxo completo com dados sintéticos (e amostra real autorizada em homologação)', 'pending'),
  ('L02', 'seguranca', 'Isolamento, quotas, concorrência e uploads testados no backend', 'pending'),
  ('L03', 'fiscal', 'Regras fiscais do escopo inicial aprovadas e vinculadas a fontes/competências', 'pending'),
  ('L04', 'fiscal', 'Casos fiscais confrontados com cálculos independentes; planilha revisada', 'pending'),
  ('L05', 'fiscal', 'Distinção destaque / responsabilidade / retenção / pagamento demonstrada', 'pending'),
  ('L06', 'fiscal', 'Amostras de benefício não ativadas como catálogo completo', 'pending'),
  ('L07', 'produto', 'Escolhas manuais identificadas e auditáveis', 'pending'),
  ('L08', 'produto', 'XML original preservado; nenhuma NF-e corrigida indevida', 'pending'),
  ('L09', 'integracao', 'ERP anunciado apenas no escopo efetivamente homologado', 'pending'),
  ('L10', 'comercial', 'Preços, capacidades, contratos, renovação, multa e privacidade aprovados', 'pending'),
  ('L11', 'comercial', 'Conta real do provedor, conciliação, cancelamento e devolução testados', 'pending'),
  ('L12', 'comercial', 'Emissão fiscal da assinatura, suporte e atendimento definidos', 'pending'),
  ('L13', 'ops', 'Backup/restauração, monitoramento, incidentes e rollback ensaiados', 'pending'),
  ('L14', 'ops', 'Domínio, certificados, credenciais e ambientes separados', 'pending'),
  ('L15', 'comercial', 'Oferta comercial descreve fielmente funcionalidades e limitações', 'pending');

INSERT INTO activation_pendencies (code, title, category, blocks, owner_role, notes) VALUES
  ('P01', 'Matriz RJ por modalidade, regime, competência, base e FECP', 'fiscal',
   'Cálculo automático anunciado como homologado', 'Responsável fiscal', ''),
  ('P02', 'Regra de arredondamento e divergências da planilha', 'fiscal',
   'Uso das fórmulas como referência de produção', 'Fiscal + programador', ''),
  ('P03', 'Acordos/atos de ST e responsabilidade por mercadoria/UF', 'fiscal',
   'Afastamento automático de adicional por retenção', 'Responsável fiscal', ''),
  ('P04', 'Íntegra e vigências do Convênio 52/91 e atos estaduais', 'fiscal',
   'Catálogo completo de benefícios produtivos', 'Responsável fiscal', ''),
  ('P05', 'Cadeia de prorrogação/ratificação/efeitos futuros', 'fiscal',
   'Ativação de regras para períodos não validados', 'Responsável fiscal', ''),
  ('P06', 'Primeiro ERP, versão, layout e ambiente de teste', 'erp',
   'Selo/afirmação de integração direta homologada', 'Proprietário + integrador', ''),
  ('P07', 'Preço, quotas pagas, descontos, suporte e margem', 'commercial',
   'Publicação de ofertas pagas finais', 'Proprietário/comercial', ''),
  ('P08', 'Entidade contratante, modelo contratual e poderes de aceite', 'legal',
   'Contratação pública com instrumento definitivo', 'Jurídico + proprietário', ''),
  ('P09', 'Renovação, oposição, reajuste, multa e devolução', 'legal',
   'Prorrogação fixa e penalidades automáticas', 'Jurídico + comercial', ''),
  ('P10', 'Papéis de privacidade, bases, retenção e prestadores', 'privacy',
   'Uso real de dados fora do ambiente controlado', 'Jurídico/privacidade + técnico', ''),
  ('P11', 'Conta gateway, credenciais e conciliação', 'payment',
   'Cobrança real', 'Proprietário + técnico', ''),
  ('P12', 'Emissão fiscal da receita do SaaS', 'commercial',
   'Operação comercial sem processo fiscal definido', 'Contabilidade da fornecedora', ''),
  ('P13', 'Domínio, marca, suporte, infraestrutura e incidentes', 'ops',
   'Publicação comercial final', 'Proprietário + técnico', ''),
  ('P14', 'Amostras de XML autorizadas/anonimizadas e cálculos independentes', 'fiscal',
   'Homologação ponta a ponta com fatos representativos', 'Fiscal + proprietário', '');

COMMENT ON TABLE launch_checklist_items IS 'Launch checklist from docs/02 — all start pending; do not auto-approve.';
COMMENT ON TABLE activation_pendencies IS 'P01–P14 from docs/03 §5 — open until designated owners resolve.';
COMMENT ON TABLE homologation_domains IS 'Independent tracks: fiscal ≠ legal ≠ ERP ≠ payment.';
