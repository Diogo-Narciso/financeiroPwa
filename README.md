# Portal Inteligente de DIFAL

**Oliveira Contabilidade** · repositório privado · rebuild a partir da documentação v1.4

SaaS fiscal multiempresa para escritórios e empresas no Brasil (início RJ). **Um produto, dois canais:** aplicativo **web** (navegador) e **mobile** (PWA instalável ou shell nativo), compartilhando a mesma conta, as mesmas regras e o mesmo backend.

> **Etapa atual: E1 — Cadastro e teste.** Login/cadastro, organizações, empresas (CNPJ), perfil tributário, questionário e cotas do teste no servidor (3 CNPJs / 5 NF-e). Sem alíquotas inventadas. Importação XML = E2. PWA/mobile depois.

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

# Smoke das cotas E1 (com o dev server no ar)
pnpm e1:smoke
```

Saúde:

```bash
curl -s http://127.0.0.1:3000/api/health
```

Esperado com banco no ar: `{ "status": "ok", "checks": { "database": "up" } }`.

## Estrutura (E0)

```text
apps/web/              # Next.js — casca UI + /api/health
packages/shared/       # tipos e constantes
packages/db/           # cliente Postgres + runner de migrações
infra/migrations/      # SQL versionado (001_foundation)
docs/                  # especificação v1.4 (já versionada)
```

Pacotes futuros (parser, tax-engine, worker, cliente PWA/mobile) não fazem parte desta etapa.

## O que o produto entrega (visão)

1. Cadastro de organizações, usuários e estabelecimentos (CNPJ)
2. Importação de XML de NF-e de entrada (saídas / catálogo opcionais)
3. Classificação de itens com sugestão explicável
4. Cálculo de DIFAL / FECP com regras **versionadas** e auditoria
5. Revisão manual com motivo e histórico
6. Exportação para escrituração **sem alterar** o XML autorizado
7. Teste gratuito (3 CNPJs, 5 NF-e/CNPJ) e planos / cobrança depois

Resumo: [`docs/escopo-produto.md`](docs/escopo-produto.md).

## Princípios inegociáveis

- A **IA não inventa** NCM, alíquotas, CFOP ou fundamento legal
- Sem dado verificável → **pendente de validação**
- **XML autorizado imutável**; CFOP de escrituração só em auxiliar
- Decisão fiscal final é do **usuário / contador**

## Stack

| Camada | Escolha |
|---|---|
| Monorepo | pnpm workspaces |
| Web | Next.js 15 + TypeScript |
| Mobile (depois) | PWA / shell nativo, mesmo backend |
| Dados | PostgreSQL 16 + `infra/migrations` |

## Etapas E0–E7

| Etapa | Conteúdo |
|---|---|
| **E0** Fundação | Repo, DB, health, casca UI |
| **E1** Cadastro | Login, orgs, empresas, cotas ← *esta entrega* |
| **E2** Documentos | Upload XML/ZIP, storage imutável |
| **E3** Revisão | Classificação, ST, manual, auditoria |
| **E4** Motor | DIFAL/FECP, benefícios versionados |
| **E5** Escrituração | CFOP auxiliar, ZIP, adaptador ERP |
| **E6** Cobrança | Planos, contrato, pagamentos |
| **E7** Homologação | Segurança, fiscal, publicação |

Detalhes: [`docs/02_ENTREGAS_E_TESTES.md`](docs/02_ENTREGAS_E_TESTES.md). Documentação completa: [`docs/00_LEIA_ME.md`](docs/00_LEIA_ME.md).

## Aceite E0

- [x] Monorepo TypeScript (`apps/web`, `packages/*`)
- [x] Postgres + migração `001_foundation.sql`
- [x] App sobe localmente (`pnpm dev`)
- [x] `/api/health` + shell UI sóbrio (teal/cinza/branco)
- [x] `docs/` preservados
- [ ] Auth multi-tenant / RLS completo → E1+
- [ ] Cliente PWA/mobile → etapa posterior
