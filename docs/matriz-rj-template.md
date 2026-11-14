# Template — captura matriz RJ (H25 / P01)

**Status:** schema de campos · **vazio de valores** · **não** é regra homologada  
**Código:** `packages/tax-engine/src/rj-matrix-template.ts`

## Objetivo

Definir os **campos obrigatórios** que o responsável fiscal deve preencher antes de qualquer `homologated` para operações RJ.

## Campos (sem valores)

| Campo | Tipo | Obrigatório | Nota |
|---|---|---|---|
| `modality` | string enum draft | sim | Ex.: aquisição contribuinte / outros — **lista aberta ao fiscal** |
| `regime` | string | sim | Regime do destinatário/operação |
| `competenceDate` | ISO date | sim | Competência da regra |
| `baseRuleRef` | string | sim | Fonte/dispositivo (URL ou cite) |
| `fecpApplies` | boolean \| null | sim | `null` = não decidido |
| `fecpFraction` | string \| null | se FECP | Fração decimal **só após** aprovação |
| `destinationIcmsFraction` | string \| null | condicional | **null até homologação** |
| `exceptions` | string[] | não | Exceções textuais |
| `approverName` | string | sim | Responsável fiscal |
| `approvedAt` | ISO datetime \| null | sim | null = não aprovado |

## Proibições

- Não pré-preencher alíquotas.
- Não marcar `publicationStatus: homologated` a partir deste template.
- Instâncias preenchidas ficam `pending_homologation` até aprovação explícita.

## CTs

- CT-rj-01: template exporta campos obrigatórios
- CT-rj-02: nenhuma fração numérica default ≠ null
