# Plano de rebuild — Portal Inteligente de DIFAL

**Data:** 2026-11-14  
**Repo:** https://github.com/Diogo-Narciso/financeiroPwa  
**HEAD referência:** `main` @ pós-E7 (inclui H6–H9)  
**Fonte:** pacote documentação v1.4 (não o app perdido `aab6c3d`)

## Situação

Rebuild a partir da especificação consolidada. Monorepo E0–E7 entregue em `main`. Histórico antigo (`aab6c3d`) permanece inacessível.

## Canais

- **Web:** `apps/web` (Next.js) — canal entregue.
- **Mobile/PWA:** adiado — [`ADR-001-canal-pwa-mobile.md`](ADR-001-canal-pwa-mobile.md).

## Stack (realizada)

- Monorepo pnpm / TypeScript (`apps/*`, `packages/*`)
- Next.js web + rotas API
- Postgres + `infra/migrations/001`…`008`
- Auth multi-tenant (org/roles)
- CI: `pnpm typecheck` + `pnpm test:unit` (H7)

## Packages

| Package | Papel |
|---|---|
| `@portal-difal/shared` | constantes, quotas policy |
| `@portal-difal/db` | migrate / client |
| `@portal-difal/nfe-parser` | XML NF-e + unit tests |
| `@portal-difal/classifier` | sugestões |
| `@portal-difal/tax-engine` | demo + `ruleStatus` gate (H9) |

## Etapas

| Etapa | Situação |
|---|---|
| E0–E6 | Entregues |
| E7 | Scaffold homologação — lançamento **não** aprovado |
| Pós-E7 | H6 unit tests · H7 CI · H8 ADR PWA · H9 gate demo≠homologated |

## Regras inegociáveis

- IA não inventa NCM/alíquotas; faltas → “pendente de validação”
- XML autorizado imutável; CFOP de escrituração é auxiliar
- Decisão fiscal final é do usuário/contador
- Demo aritmética **nunca** é regra `homologated` (`ruleStatus`)
- Não publicar preços/regras não homologados como definitivos

## Bloqueios de produção

Ver `docs/lancamento-checklist.md` e P01–P14 em `docs/03_FONTES_E_PENDENCIAS.md`: regras `homologated`, pagamentos reais, ERP certificado.
