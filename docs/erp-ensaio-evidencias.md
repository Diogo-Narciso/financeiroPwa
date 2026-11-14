# Pacote evidências — ensaio importação ERP (H21 / P06)

**Status:** roteiro de evidências · **não** certifica ERP  
**Pré:** `docs/export-erp-inventory.md` (H20)

## Objetivo

Orientar um ensaio controlado de importação do ZIP de exportação em um ERP candidato, sem declarar homologação.

## Artefatos a coletar

| # | Evidência | Obrigatório |
|---|---|---|
| 1 | Nome/versão do ERP + ambiente (homolog/sandbox) | sim |
| 2 | ZIP gerado pelo Portal (job id + SHA-256) | sim |
| 3 | Print/log da importação no ERP | sim |
| 4 | Diferenças de layout/campos mapeados | sim |
| 5 | Itens rejeitados / pendências | se houver |
| 6 | Declaração: “ensaio ≠ certificação” | sim |

## Roteiro

1. Gerar ZIP via fluxo E5 (`buildExportZip`) para empresa trial.  
2. Conferir `erp/README.txt` e manifesto.  
3. Importar no ERP de teste.  
4. Registrar evidências 1–6 neste pacote (fora do git se sensível).  
5. Só então abrir H22 (critérios de certificado).

## Fora

- Selo “ERP homologado”
- Alterar layout do ZIP neste cartão

## CTs

- CT-erp-01: doc aponta H20 + proíbe certificação prematura  
- CT-erp-02: lista artefatos 1–6
