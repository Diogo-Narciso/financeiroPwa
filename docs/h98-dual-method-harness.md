# Harness — dual GET/POST subscription note (H98 / H94 · H89)

**Status:** harness de cobertura da nota dual-method · **não** altera ACL · **não** fecha E-R01  
**Fontes:** `docs/billing-subscription-dual-method-note.md` (H94) · `apps/web/src/server/billing-subscription-role-proposal.ts` (H89)

## Cobertura

| Item | Esperado |
|---|---|
| H94 nota | GET e POST → owner \| admin |
| H89 proposal | mesma const cobre ambos os métodos |
| Route | GET+POST exportados; **sem** import do helper |

## Proposta testada (via H89)

owner | admin → true; analyst/reviewer/demais → false — aplicável a GET e POST.

## Proibições

- Não importar o helper na route neste PR.
- Não duplicar proposal TS; reutilizar H89.
- Não fechar E-R01/G-R01 / não inventar PSP cert.

## CTs

- CT-u98-01: doc cita H94 / H89 / GET / POST  
- CT-u98-02: proposal existe; route sem matchesBillingSubscriptionRoleProposal  
- CT-u98-03: assert CI
