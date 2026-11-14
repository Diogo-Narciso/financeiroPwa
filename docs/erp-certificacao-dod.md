# Critérios de “certificado” ERP + gaps (H22 / P06)

**Status:** definition of done · **não** marca P06 como feito  
**Pré:** H20 inventário · H21 pacote de evidências de ensaio

## DoD — o que falta para afirmar certificação

| # | Critério | Evidência mínima | Situação |
|---|---|---|---|
| 1 | ERP nomeado + versão + ambiente | registro H21 artefato 1 | gap |
| 2 | Importação real do ZIP com sucesso | log/print H21 | gap |
| 3 | Mapeamento campos documentado | diff layout H21 | gap |
| 4 | Itens rejeitados tratados / aceitos | lista H21 | gap |
| 5 | Aprovação do integrador/cliente | assinatura/e-mail | gap |
| 6 | Checklist lançamento P06 marcado | `lancamento-checklist` | **aberto** |

## Gaps bloqueadores (hoje)

- Nenhum ensaio H21 anexado neste repo (só roteiro).
- `erp/README.txt` ainda declara adaptador genérico não homologado.
- Sem selo automático no produto — e **não deve** haver até 1–5.

## Fora de escopo H22

- Implementar conector ERP específico
- Alterar formato do ZIP

## CTs

- CT-c01: doc exige H21 evidências  
- CT-c02: afirma P06 ainda aberto  
- CT-c03: assert CI
