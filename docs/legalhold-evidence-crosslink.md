# Cross-link — legal hold ticket ↔ evidence pack (H75 / H63 · H69)

**Status:** ligação documental · **não** executa purge · **não** fecha P10  
**Fontes:** `docs/legal-hold-purge-ticket.md` (H63) · `docs/audit-events-purge-evidence-links.md` (H69)

## Mapeamento

| Evidence (H69) | Legal hold (H63) | Nota |
|---|---|---|
| `L-03` `legalHoldTicketUri` | ticket dual control | URI/path do ticket; null até ops |
| `L-06` `purgeJobExists=false` | `blocks_purge=true` | hold ativo impede DELETE |
| `tenant_id` (único) | `tenant_id` | H17 isolation |

## Fluxo (docs only)

1. Abrir ticket legal hold (H63) com dual control.
2. Preencher `legalHoldTicketUri` no pack H69 (sem FQDN inventado).
3. Dry-run só com hold registrado; `purgeJobExists` permanece false.

## Proibições

- Não DELETE / não hardcodar FQDN.
- Não fechar P10 / H51 implementação.
- Não misturar tenants.

## CTs

- CT-lx-01: cita H63 / H69 / L-03 / legalHoldTicketUri  
- CT-lx-02: blocks_purge + purgeJobExists false  
- CT-lx-03: assert CI
