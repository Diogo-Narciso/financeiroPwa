# Checklist — preenchimento ops dos URIs do pack evidências (H79 / H69 · H75)

**Status:** checklist operacional · **não** executa purge · **não** fecha P10  
**Fontes:** H69 evidence links · H75 legal-hold crosslink

## Campos a preencher (sem inventar FQDN)

| ID | Campo | Como preencher |
|---|---|---|
| L-01 | `countByTenantUri` | path relativo / ticket interno; null se ausente |
| L-02 | `preservedActionsSampleUri` | idem |
| L-03 | `legalHoldTicketUri` | ticket H63 dual control (ver H75) |
| L-04 | `dryRunLogUri` | path do log sem DELETE |
| L-05 | `stagingTicketUri` | E-S06 |
| L-06 | `purgeJobExists` | **false** até job real |

## Regras

1. Preferir paths relativos ou IDs de ticket; nunca inventar hostname de produção.
2. L-03 só após hold com `blocks_purge=true`.
3. Manter `purgeJobExists=false` neste cartão.

## Proibições

- Não DELETE / não hardcodar FQDN.
- Não fechar P10 / H51.
- Não misturar tenants.

## CTs

- CT-of-01: cita H69 / H75 / L-01–L-06  
- CT-of-02: purgeJobExists false + proíbe FQDN/DELETE  
- CT-of-03: assert CI
