# Nota — dual GET/POST `billing/subscription` (H94 / H88)

**Status:** nota de alinhamento · **não** altera ACL · **não** fecha E-R01  
**Fontes:** H88 subscription roles spec · `apps/web/src/app/api/billing/subscription/route.ts`

## AS-IS

Mesma route exporta `GET` e `POST`; ambos AUTH (`requireUser`) sem role array.

## Alinhamento (draft)

| Método | Roles sugeridas (H88) | Nota |
|---|---|---|
| GET | owner \| admin | leitura |
| POST | owner \| admin | aceite plano / trial |

Mesma const de proposal (H89) cobre ambos os métodos.

## Campos

| Campo | Valor |
|---|---|
| `aclChangedInThisPR` | **false** |
| `eR01Closed` | **false** |

## Proibições

- Não editar a route neste PR.
- Não inventar roles / PSP cert.
- Não fechar E-R01/G-R01.

## CTs

- CT-dm-01: cita H88 / GET / POST / owner|admin  
- CT-dm-02: aclChangedInThisPR false  
- CT-dm-03: assert CI
