# Divergências — CASOS_ARITMETICOS vs planilha (H26 / P02)

**Status:** doc de confronto · **não** promove demo a regra  
**Fontes:** `packages/tax-engine` DEMO_CASES · materiais históricos da planilha (bytes preservados)

## Escopo

Registrar **como** confrontar ARIT-A/B/C com a planilha de referência, sem usar o resultado como alíquota oficial.

## Método

1. Rodar `pnpm e4:arit` / `assertDemoCase` para ARIT-A, B, C.  
2. Abrir planilha histórica (manifesto SHA em docs) na mesma competência ilustrativa.  
3. Preencher tabela abaixo (valores só após medição — placeholders `TBD` ok).  
4. Classificar divergência: arredondamento / base / fora de escopo.

## Tabela (preencher na execução)

| Caso | Campo | Motor demo | Planilha | Delta | Classificação |
|---|---|---|---|---|---|
| ARIT-A | icms / fecp / sum | (assert) | TBD | TBD | TBD |
| ARIT-B | … | (assert) | TBD | TBD | TBD |
| ARIT-C | … | (assert) | TBD | TBD | TBD |

## Proibições

- Não copiar resultado demo para `homologated`.
- Não “ajustar” o motor para bater a planilha sem decisão fiscal (P02).

## CTs

- CT-d01: doc cita ARIT-A/B/C e P02  
- CT-d02: proíbe promoção demo→homologated
