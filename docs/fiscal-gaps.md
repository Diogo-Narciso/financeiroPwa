# Gaps fiscais AS-IS (H4 / SME)

**Status:** inventário de lacunas · **não** homologa regra · **não** inventa alíquota  
**Fontes:** `03_FONTES_E_PENDENCIAS.md` §5 · `rule-inventory.md` · `convenio-52-91-evidencias.md`

## Resumo

| Gap | Pri | Bloqueia | História / ponteiro |
|---|---|---|---|
| G-F01 Matriz RJ (modalidade/regime/base/FECP) | P0 | Cálculo anunciado como homologado | P01 → H23 |
| G-F02 Arredondamento vs planilha | P1 | Fórmulas como referência de produção | P02 → H23 |
| G-F03 ST / responsabilidade mercadoria-UF | P1 | Afastamento automático por retenção | P03 → H23 |
| G-F04 Convênio 52/91 íntegra + atos UF | P1 | Catálogo benefícios produtivos | P04 · evidências H15 |
| G-F05 Prorrogação 131/26 / ratificação | P1 | Regras 2027/28 | P05 · H15 F09 |
| G-F06 XML autorizados + cálculos independentes | P0 | Homologação ponta a ponta | P14 → H23 |
| G-F07 Zero regras `homologated` no motor | P0 | Produção fiscal | H9/H14 inventário |

## Estado do motor (HEAD)

- `buildRuleInventory()`: **0** `homologated`; demo ARIT-A/B/C; módulo aquisição `pending_homologation`; venda não-contribuinte `disabled`.
- Gate H9: demo ≠ homologated.

## Proibições SME

- Não cadastrar “52/91 = DIFAL zero”.
- Não somar FECP 2% automático fora do enquadramento.
- Não ativar 2027/28 sem cadeia de ratificação validada.

## Próximo

H23: matriz P01–P05/P14 → cartões acionáveis (sem fechar pendência fiscal).
