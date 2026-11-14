# Portal Inteligente de DIFAL

**Oliveira Contabilidade** · repositório privado · rebuild a partir da documentação v1.4

SaaS fiscal multiempresa para escritórios e empresas no Brasil (início RJ). **Um produto, dois canais:** aplicativo **web** (navegador) e **mobile** (PWA instalável ou shell nativo), compartilhando a mesma conta, as mesmas regras e o mesmo backend.

> **Etapa atual: E7 — Homologação (scaffold).** E0–E6 entregues no monorepo. **Produção comercial ainda bloqueada** até: regras fiscais `homologated`, pagamentos reais, certificação ERP, e resolução das pendências P01–P14 (`docs/03`).

## Como rodar localmente

Pré-requisitos: Node.js ≥ 20, [pnpm](https://pnpm.io/) 9+, Docker **ou** PostgreSQL 16.

```bash
pnpm install
cp .env.example .env

# Banco (Docker recomendado)
docker compose up -d
# — ou — Postgres local com DATABASE_URL apontando para portal_difal

pnpm db:migrate
pnpm db:status          # opcional
pnpm dev                # http://127.0.0.1:3000

# Smokes (dev server no ar)
pnpm e1:smoke … pnpm e7:smoke

# Unit tests (nfe-parser + quota policy — sem banco)
pnpm test:unit
```

CI (GitHub Actions) roda `pnpm typecheck` e `pnpm test:unit` em push/PR. Smokes `e1`…`e7` continuam manuais (exigem app + Postgres).


Saúde:

```bash
curl -s http://127.0.0.1:3000/api/health
```

Esperado com banco no ar: `{ "status": "ok", "checks": { "database": "up" } }`.

## Estrutura

```text
apps/web/              # Next.js — UI + APIs
packages/shared/       # tipos e constantes
packages/db/           # cliente Postgres + migrações
packages/nfe-parser/   # XML NF-e
packages/classifier/   # sugestões de classificação
packages/tax-engine/   # motor (demo + pending)
infra/migrations/      # 001…008
docs/                  # especificação v1.4
```

## Status E0–E7

| Etapa | Conteúdo | Situação |
|---|---|---|
| **E0** Fundação | Repo, DB, health, casca UI | Entregue |
| **E1** Cadastro | Login, orgs, empresas, cotas 3/5 | Entregue |
| **E2** Documentos | Upload XML/ZIP, storage imutável | Entregue |
| **E3** Revisão | Classificação, manual, auditoria | Entregue |
| **E4** Motor | DIFAL/FECP versionado; demo aritmética | Entregue — **sem** regra `homologated` |
| **E5** Escrituração | CFOP auxiliar, ZIP, adaptador ERP | Entregue — ERP **não** certificado |
| **E6** Cobrança | Planos, contrato, mock_sandbox | Entregue — preços placeholder **não** oficiais |
| **E7** Homologação | Checklist, P01–P14, readiness, CI | Scaffold — **lançamento não aprovado** |

Detalhes: [`docs/02_ENTREGAS_E_TESTES.md`](docs/02_ENTREGAS_E_TESTES.md) · Pendências: [`docs/03_FONTES_E_PENDENCIAS.md`](docs/03_FONTES_E_PENDENCIAS.md) · Lançamento: [`docs/lancamento-checklist.md`](docs/lancamento-checklist.md).

## O que falta para produção

1. **Regras fiscais homologadas** (responsável fiscal; P01–P05, P14) — hoje só `demo_arithmetic` / `pending_homologation`
2. **Pagamentos reais** (P11) — hoje só adapter `mock_sandbox`
3. **Certificação ERP** (P06) após importação real documentada
4. **Comercial/jurídico/privacidade** (P07–P10, P12): preços oficiais, contratos, multa, LGPD operacional
5. **Ops** (P13): domínio, backup/restore ensaiado, suporte, monitoramento

UI de readiness: `/homologacao` · `GET /api/homologation/status`.

## Princípios inegociáveis

- A **IA não inventa** NCM, alíquotas, CFOP ou fundamento legal
- Sem dado verificável → **pendente de validação**
- **XML autorizado imutável**; CFOP de escrituração só em auxiliar
- Decisão fiscal final é do **usuário / contador**
- Não publicar regras/preços não homologados como definitivos

## Stack

| Camada | Escolha |
|---|---|
| Monorepo | pnpm workspaces |
| Web | Next.js 15 + TypeScript |
| Mobile (depois) | PWA / shell nativo, mesmo backend |
| Dados | PostgreSQL 16 + `infra/migrations` |
| Cobrança | `mock_sandbox` até gateway real |
