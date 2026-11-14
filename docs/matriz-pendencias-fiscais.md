# Matriz P01–P05 / P14 → cartões (H23)

**Status:** matriz acionável · **não** fecha pendência fiscal  
**Entrada:** `docs/fiscal-gaps.md` (H4) · `03_FONTES_E_PENDENCIAS.md` §5

| Pendência | Gap H4 | Cartão sugerido | Classe | Pri | Dependência |
|---|---|---|---|---|---|
| P01 Matriz RJ | G-F01 | H25 — template captura modalidade/regime/base/FECP (só campos) | M | P0 | Responsável fiscal |
| P02 Arredondamento | G-F02 | H26 — confrontar CASOS_ARITMETICOS vs planilha (doc divergências) | P | P1 | H14 inventário |
| P03 ST/UF | G-F03 | H27 — lista atos ST citados nos docs (sem aplicar) | M | P1 | SME |
| P04 52/91 | G-F04 | *(coberto H15)* pacote evidências | — | — | H15 Validado |
| P05 131/26 | G-F05 | H28 — checklist ratificação nacional (campos) | P | P1 | H15 F09 |
| P14 XML+cálculos | G-F06 | H29 — protocolo amostras anonimizadas + dual calc | M | P0 | H16 fixtures |

## Fora

- Inventar alíquotas ou marcar `homologated`
- Implementar cálculo RJ completo

## CTs

- CT-m01: doc cita P01–P05 e P14
- CT-m02: aponta H25–H29 sem inventar taxa
