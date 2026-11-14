# Template — ticket legal hold (bloqueio de purge) (H63 / pós H51/H56)

**Status:** template operacional · **não** executa purge · **não** fecha P10  
**Fontes:** H51 purge job spec · H56 dry-run · H61 staging evidence

## Campos obrigatórios

| Campo | Nota |
|---|---|
| `tenant_id` | único (H17) |
| `hold_reason` | custódia fiscal / litígio / pedido titular |
| `scope` | `audit_events` e/ou storage XML |
| `opened_by` | operador + ticket id |
| `dual_control` | segundo aprovador |
| `blocks_purge` | **true** enquanto ativo |

## Checklist

1. Registrar hold antes de qualquer dry-run com intenção de DELETE.
2. `purgeJobExists` permanece false até implementador + hold liberado.
3. Não misturar tenants no hold.

## Proibições

- Não DELETE em produção neste cartão.
- Não liberar hold sem dual control.
- Não marcar P10 como fechado.

## CTs

- CT-lh-01: cita H51/H56 / legal hold / tenant_id  
- CT-lh-02: blocks_purge true + proíbe DELETE  
- CT-lh-03: assert CI
