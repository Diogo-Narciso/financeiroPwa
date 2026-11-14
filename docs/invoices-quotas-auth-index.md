# Índice — `invoices` / `quotas` AUTH (H67 / E-R01 resto)

**Status:** inventário pontual · **não** altera ACL · **não** fecha E-R01  
**Fontes:** H43 · H55 · `apps/web/src/app/api/invoices/**` · `quotas/**`

## Escopo

| Path | Métodos | Tag |
|---|---|---|
| `invoices` | GET | AUTH (`requireUser` sem role array) |
| `quotas` | (handlers existentes) | AUTH |
| `quotas/entry-invoices/reserve` | (handlers existentes) | AUTH |

Tenant isolation via `tenant_id` nas queries permanece (H17).

## Achado

| ID | Nota | Pri |
|---|---|---|
| E-R01 | Resto AUTH sem role array (invoices/quotas) além de companies/[id]* | P2 |

## Proibições

- Não editar handlers invoices/quotas neste PR.
- Não inventar roles.
- Não fechar E-R01/G-R01.

## CTs

- CT-iq-01: cita E-R01 / invoices / quotas / AUTH  
- CT-iq-02: proíbe alterar ACL  
- CT-iq-03: assert CI
