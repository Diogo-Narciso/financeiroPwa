# Inventário export ZIP vs checklist ERP (H20 / P06)

**Status:** AS-IS do contrato de export · **não** certifica ERP  
**Código:** `apps/web/src/server/export-zip.ts`

## O que o ZIP entrega hoje

| Path no ZIP | Conteúdo | Nota |
|---|---|---|
| `originais/*.xml` | Bytes originais (hash conferido) | Imutabilidade preservada |
| `mapeamento_cfop/entrada_itens.csv` | Itens + CFOP escrituração / purpose | |
| `apuracao/memoria_calculo.csv` | Decisões manuais + disclaimer | |
| `pendencias/itens_nao_aprovados.csv` | Itens sem purpose/CFOP | |
| `erp/README.txt` | “Adaptador genérico; nenhum ERP homologado” | Explícito |
| Manifesto + SHA-256 do ZIP | `export_jobs` / `export_manifests` | Auditoria |

## vs P06 / certificação

| Requisito típico P06 | AS-IS | Gap |
|---|---|---|
| ERP nomeado + versão | Ausente | H21 evidências ensaio |
| Ambiente de teste documentado | Ausente | H21 |
| Importação real com evidência | Não feita | H21/H22 |
| Selo “homologado” | Proibido até evidência | H22 DoD |

## CTs

- CT-e01: doc lista paths do ZIP
- CT-e02: afirma que ERP **não** está certificado
