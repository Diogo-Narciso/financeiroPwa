# Spec — roles sugeridas `companies/[id]` PATCH (H60 / pós H55)

**Status:** especificação · **não** altera ACL · **não** fecha E-R01 / G-R01  
**Fontes:** `docs/companies-auth-index.md` (H55) · H43 · ADR-002

## Objetivo

Propor roles para mutadores AUTH em `companies/[id]*` sem aplicar no código neste cartão.

## Proposta (draft)

| Path | Método | Roles sugeridas | Nota |
|---|---|---|---|
| `companies/[id]` | PATCH | owner \| admin | alinhado ADR-002 (admin operacional) |
| `companies/[id]/tax-profile` | mutadores | owner \| admin \| analyst | draft |
| `companies/[id]/activity-profile` | mutadores | owner \| admin \| analyst | draft |
| `companies/[id]` | GET | manter AUTH ou owner\|admin\|analyst\|reviewer | leitura — decisão futura |

## Campos

| Campo | Valor |
|---|---|
| `aclChangedInThisPR` | **false** |
| `eR01Closed` | **false** |

## Proibições

- Não editar handlers `companies/[id]*` neste PR.
- Não inventar roles fora do vocabulário H37/ADR-002.
- Não fechar E-R01/G-R01.

## CTs

- CT-cp-01: cita H55 / E-R01 / PATCH  
- CT-cp-02: aclChangedInThisPR false  
- CT-cp-03: assert CI
