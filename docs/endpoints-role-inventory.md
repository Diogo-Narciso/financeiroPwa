# Inventário — endpoints × role check (H43 / G-R01)

**Status:** inventário AS-IS · **não** altera ACL · **não** fecha G-R01  
**Fontes:** `apps/web/src/app/api/**/route.ts` · H37 · H42

## Legenda

| Tag | Significado |
|---|---|
| ROLE | Checagem explícita de `role` (ou via server com `role`) |
| AUTH | Autenticado (sessão) sem array de roles no handler |
| OPEN | Público / mock / health (sem sessão) |

## Inventário (HEAD)

| Tag | Path |
|---|---|
| OPEN | `auth/login`, `auth/logout`, `auth/me`, `auth/signup` |
| OPEN | `health`, `billing/webhook/mock`, `tax/demo/arithmetic` |
| ROLE | `companies` (POST lista), `imports/entries`, `analysis/[companyId]` |
| ROLE | `exports`, `tax-runs`, items cfop/classification/manual-tax |
| ROLE | `homologation/checklist`, `pendencies`, `status` |
| AUTH | `companies/[id]` (+ activity/tax-profile), `imports/[id]`, `exports/[id]/download` |
| AUTH | `invoices`, `quotas`, `quotas/entry-invoices/reserve` |
| AUTH | `billing/plans`, `subscription`, `cancel` |
| AUTH | `tax-runs/[id]` |

## Achados (sem remediação neste cartão)

| ID | Achado | Pri |
|---|---|---|
| E-R01 | Vários mutadores AUTH sem role array (companies/[id], invoices, quotas) | P2 |
| E-R02 | `tax-runs` tem ROLE; `tax-runs/[id]` só AUTH — inconsistência | P2 |
| E-R03 | `exports` ROLE; download AUTH | P2 |
| E-R04 | Webhook mock OPEN (esperado sandbox) | info |

## Proibições

- Não “corrigir” ACL inventando permissões neste PR.
- Não promover endpoint a poder `homologated`.
- Manter H17 404 cross-tenant.

## CTs

- CT-ep-01: doc usa tags ROLE/AUTH/OPEN  
- CT-ep-02: cita G-R01 / H37 / inconsistências E-R*  
- CT-ep-03: assert CI
