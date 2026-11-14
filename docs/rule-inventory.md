# Inventário — regras demo vs pending (H14)

**Agente:** data-analyst · **Fonte de verdade no código:** `packages/tax-engine/src/rule-inventory.ts`  
**Limite:** não inventa alíquota nem promove `demo` → `homologated`.

## Resumo (MVP HEAD)

| Status | Significado | Contagem esperada* |
|---|---|---|
| `demo` | Casos ARIT-A/B/C ilustrativos | 3 |
| `pending_homologation` | Módulo aquisição com estrutura, sem calc produção | ≥1 |
| `disabled` | Módulo venda não-contribuinte off no MVP | ≥1 |
| `homologated` | Regra fiscal aprovada | **0** |

\* Contagens validadas por `rule-inventory.test.ts` contra `DEMO_CASES` + `MODULE_STATUS`.

## Módulos (`MODULE_STATUS`)

| ID | publicationStatus | productionCalculation |
|---|---|---|
| `difal_aquisicao_consumidor_final_contribuinte` | `pending_homologation` | false |
| `difal_venda_consumidor_final_nao_contribuinte` | `disabled` | false |

## Demo cases (`DEMO_CASES`)

| ID | Uso |
|---|---|
| ARIT-A | Demonstração gross-up (não lei) |
| ARIT-B | Caso zero ilustrativo |
| ARIT-C | Caso parcial ilustrativo |

## Como regenerar mentalmente

```bash
pnpm --filter @portal-difal/tax-engine test:unit
```

`buildRuleInventory()` / `summarizeRuleInventory()` exportados do pacote.

## Fora de escopo

- Pacote evidências Convênio 52/91 (H15)
- Publicar qualquer linha como `homologated`
