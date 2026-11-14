# Inventário — endpoints × role check (H59 / refresh H43)

**Status:** inventário AS-IS atualizado · **não** altera ACL · **não** fecha G-R01  
**Fontes:** H43 · H48/H49/H53/H54 · `apps/web/src/app/api/**/route.ts`

## Legenda

| Tag | Significado |
|---|---|
| ROLE | Checagem explícita de `role` (ou helper) |
| AUTH | Autenticado sem array/helper de roles no handler |
| OPEN | Público / mock / health |

## Inventário (HEAD pós H54)

| Tag | Path |
|---|---|
| OPEN | `auth/login`, `auth/logout`, `auth/me`, `auth/signup` |
| OPEN | `health`, `billing/webhook/mock`, `tax/demo/arithmetic` |
| ROLE | `companies` (POST lista), `imports/entries`, `analysis/[companyId]` |
| ROLE | `exports`, `exports/[id]/download` (H49/H54 helper) |
| ROLE | `tax-runs`, `tax-runs/[id]` (H48/H53 helper) |
| ROLE | items cfop/classification/manual-tax |
| ROLE | `homologation/checklist`, `pendencies`, `status` |
| AUTH | `companies/[id]` (+ activity/tax-profile) — E-R01 (H55) |
| AUTH | `imports/[id]`, `invoices`, `quotas`, `quotas/entry-invoices/reserve` |
| AUTH | `billing/plans`, `subscription`, `cancel` |

## Achados

| ID | Achado | Pri | Nota |
|---|---|---|---|
| E-R01 | companies/[id]* AUTH sem role array | P2 | H55 índice |
| E-R02 | tax-runs/[id] inconsistência | — | **tratado** H48/H53 |
| E-R03 | exports download AUTH | — | **tratado** H49/H54 |
| E-R04 | Webhook mock OPEN | info | esperado sandbox |

## Proibições

- Não “corrigir” ACL inventando permissões neste PR.
- Manter H17 404 cross-tenant.

## CTs

- CT-ep59-01: doc tags ROLE/AUTH/OPEN + H48/H49  
- CT-ep59-02: E-R02/E-R03 marcados tratados  
- CT-ep59-03: assert CI
