# Template — ticket export titular (H57 / pós H52)

**Status:** template operacional · **não** implementa endpoint · **não** fecha P10  
**Fontes:** `docs/export-titular-spec.md` (H52) · H11

## Campos obrigatórios do ticket

| Campo | Exemplo / nota |
|---|---|
| `tenant_id` | UUID do tenant (único — sem misturar) |
| `solicitante` | nome + papel na organização controladora |
| `evidência_legitimidade` | anexo / referência |
| `escopo` | cadastro / auth meta / audit_events período |
| `período` | ISO dates ou “conta ativa” |
| `canal_entrega` | offline seguro (não self-service) |

## Checklist agente

1. Confirmar um único `tenant_id` (H17).
2. Registrar `titular.export.requested` (draft) em audit quando processo existir.
3. Não criar rota pública neste cartão (`exportTitularEndpointExists=false`).

## Proibições

- Não misturar tenants.
- Não inventar campos fiscais/PSP.
- Não marcar P10 como fechado.

## CTs

- CT-tt-01: cita H52 / titular / tenant_id  
- CT-tt-02: proíbe self-service / endpoint  
- CT-tt-03: assert CI
