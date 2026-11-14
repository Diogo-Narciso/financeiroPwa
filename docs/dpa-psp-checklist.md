# Checklist — DPA / tratamento de dados do PSP (H40 / P10×P11)

**Status:** campos jurídicos-ops · **não** assina DPA · **não** escolhe PSP · **não** fecha P10/P11  
**Fontes:** H11 LGPD draft · H34 G-P11-07 · H12 spike

## Aviso

Antes de `BILLING_PROVIDER` live, o tratamento de dados pelo gateway precisa de revisão jurídica (DPA/suboperador).  
Este cartão só lista **campos** a preencher — valores permanecem vazios.

## Campos

| ID | Campo | Obrigatório | Nota |
|---|---|---|---|
| DPA-01 | `pspCandidate` | sim | Nome do candidato (ainda não decisão final — H34 G-P11-01) |
| DPA-02 | `dpaSigned` | sim | boolean \| null — **null** até jurídico |
| DPA-03 | `dpaVersion` | se assinado | Versão do instrumento |
| DPA-04 | `subprocessorListUrl` | sim | URL oficial do PSP (null = não conferida) |
| DPA-05 | `dataCategoriesShared` | sim | Ex.: email cobrança, ids internos — **sem** XML fiscal |
| DPA-06 | `internationalTransfer` | boolean \| null | null = não revisado |
| DPA-07 | `retentionAtPsp` | string \| null | Política do PSP — não inventar prazo |
| DPA-08 | `legalReviewer` | sim | Responsável jurídico |
| DPA-09 | `reviewedAt` | ISO \| null | |
| DPA-10 | `liveBillingAllowed` | boolean | **sempre false** neste pacote |

## Proibições

- Não marcar P10/P11/G-P11-07 como fechados.
- Não enviar XML NF-e / dados fiscais ao PSP.
- Não commitar DPA assinado com dados pessoais no git público.

## Ligação

- Gaps: `docs/psp-live-gaps.md` G-P11-07  
- LGPD: `docs/lgpd-retencao.md` (H11)

## CTs

- CT-dpa-01: cita P10 / P11 / DPA / H34  
- CT-dpa-02: `liveBillingAllowed` false / proíbe fechar  
- CT-dpa-03: assert CI
