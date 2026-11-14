# 1ª fatia acionável de melhorias (H5)

**Status:** plano consolidado + fila · **não** homologa fiscal · **não** libera go-live  
**Entradas:** H1 Top 5 · H2 A1–A6 · H3 · H4 / `fiscal-gaps.md` · backlog pós-E7

## Objetivo

Transformar a auditoria BL-01 (H1–H4) em **um plano aprovável** e uma **fila de cartões** já priorizada — sem absorver escopo de épicos abertos.

## Fatia 1 (aprovada como fila de execução)

| # | Tema (H1 Top 5) | Cartões | Situação na fila |
|---|---|---|---|
| 1 | Regras fiscais / gates | H9 gate demo≠homologated · H14 inventário · H4 gaps · H23→H25–H29 · H15 evidências | **entregue / em curso** (docs+gates; **0** `homologated`) |
| 2 | Pagamentos reais | H12 PaymentAdapter spike (fail-closed) | **spike entregue** · live PSP ainda pendente |
| 3 | ERP / export | H20 inventário · H21 ensaio · H22 DoD | **docs entregues** · certificação **aberta** |
| 4 | Comercial / LGPD | H11 retenção · H3 security | **parcial** · contratos/preços oficiais fora |
| 5 | Ops lançamento | H13 backup/restore · H7 CI · H6 unit | **base entregue** · domínio/monitoramento suporte ainda P13 |

## Cartões ainda abertos após esta fatia (não inventar taxa)

| ID | Título | Pri | Nota |
|---|---|---|---|
| H28 | Checklist ratificação 131/26 | P1 | P05 / G-F05 |
| H24 | Template registro regra homologada | P2 | catálogo BL-03 |
| P06 | Certificação ERP real | P1 | depende evidências H21 anexadas |
| P11 | PSP live | P0 | além do spike H12 |
| P01 | Matriz RJ preenchida | P0 | H25 = campos; valores = fiscal |

## Critérios de aceite do plano

1. Cada item do Top 5 aponta ≥1 cartão com ID.  
2. Nenhum item marca regra `homologated` ou alíquota inventada.  
3. Go-live continua bloqueado por P01–P14 / `lancamento-checklist.md`.

## Fora de escopo H5

- Implementar conector ERP ou PSP produtivo  
- Preencher alíquotas RJ / ativar 2027/28  
- Substituir parecer do responsável fiscal

## CTs

- CT-f01: doc referencia H1 Top 5 e H2 achados  
- CT-f02: afirma 0 homologated / go-live bloqueado  
- CT-f03: lista cartões abertos sem inventar taxa
