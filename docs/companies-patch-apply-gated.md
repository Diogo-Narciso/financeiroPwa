# Gate — aplicar roles PATCH `companies/[id]` (H65 / pós H60)

**Status:** **bloqueado** até aceite PM/security · **não** altera ACL neste cartão  
**Fontes:** `docs/companies-patch-roles-spec.md` (H60) · H55 E-R01

## Pré-condições (todas abertas)

| ID | Pré-condição | Situação |
|---|---|---|
| G-01 | Aceite PM da proposta H60 | aberto |
| G-02 | Aceite security (ADR-002 coerente) | aberto |
| G-03 | Teste unitário do helper (follow-up) | aberto |
| G-04 | `aclChangedInThisPR` | **false** |

## Proposta a aplicar (só após G-01+G-02)

Ver tabela em H60 — PATCH `companies/[id]` → owner\|admin (draft).

## Proibições

- Não editar `apps/web/src/app/api/companies/[id]/**` neste PR.
- Não fechar E-R01 sem aceite.
- Não inventar roles.

## CTs

- CT-ga-01: cita H60 / gated / G-01  
- CT-ga-02: aclChangedInThisPR false + proíbe editar routes  
- CT-ga-03: assert CI
