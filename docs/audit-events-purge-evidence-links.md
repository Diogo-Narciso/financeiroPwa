# Campos de link — pack evidências dry-run (H69 / pós H61)

**Status:** schema de links · **não** executa purge · **não** fecha P10  
**Fontes:** `docs/audit-events-purge-staging-evidence.md` (H61)

## Objetivo

Definir campos URL/path para anexar evidências E-S01–E-S06 sem inventar FQDNs.

## Campos (todos null até preenchidos em ops)

| ID | Campo | Tipo | Nota |
|---|---|---|---|
| L-01 | `countByTenantUri` | string \| null | link/path do dump de contagem |
| L-02 | `preservedActionsSampleUri` | string \| null | sample IDs |
| L-03 | `legalHoldTicketUri` | string \| null | ticket dual control |
| L-04 | `dryRunLogUri` | string \| null | log sem DELETE |
| L-05 | `stagingTicketUri` | string \| null | E-S06 |
| L-06 | `purgeJobExists` | boolean | **false** |

## Proibições

- Não hardcodar FQDN/URL de produção.
- Não rodar DELETE.
- Não marcar P10/H51 implementação como feitos.

## CTs

- CT-el-01: cita H61 / L-01–L-06  
- CT-el-02: purgeJobExists false + proíbe FQDN/DELETE  
- CT-el-03: assert CI
