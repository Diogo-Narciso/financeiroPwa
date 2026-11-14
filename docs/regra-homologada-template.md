# Template — registro de regra homologada (H24)

**Status:** schema de campos obrigatórios · **vazio de valores** · **não** cria regra `homologated`  
**Fonte:** `01_ESPECIFICACAO_CONSOLIDADA.md` §13.4 · BL-03

## Objetivo

Definir os **campos mínimos** de um registro de regra versionada antes de qualquer promoção a `homologated`.

## Campos (sem valores produtivos)

| Campo | Tipo | Obrigatório | Nota |
|---|---|---|---|
| `ruleId` | string | sim | Identificador estável da regra |
| `version` | string | sim | Versão imutável após publicação |
| `modality` | string | sim | Modalidade da operação |
| `originUf` | string \| null | sim | UF origem (`null` = não definida) |
| `destinationUf` | string \| null | sim | UF destino |
| `regime` | string | sim | Regime aplicável |
| `conditions` | string[] | sim | Condições textuais (pode ser `[]` só em rascunho) |
| `exceptions` | string[] | não | Exceções |
| `legalReferences` | string[] | sim | Fontes/dispositivos (URLs ou cites) |
| `formulaRef` | string \| null | sim | Referência à fórmula — **null** até aprovação |
| `roundingPolicyRef` | string \| null | sim | Política de arredondamento — null até aprovação |
| `effectsStart` | ISO date \| null | sim | Início dos efeitos |
| `effectsEnd` | ISO date \| null | não | Término |
| `publicationDate` | ISO date \| null | sim | Publicação do ato |
| `ratificationDate` | ISO date \| null | quando cabível | Separar de publicação |
| `stateImplementation` | string \| null | quando exigida | Ato/UF |
| `reviewerName` | string \| null | sim | Revisor fiscal |
| `reviewedAt` | ISO datetime \| null | sim | Data da revisão |
| `status` | enum | sim | `draft` \| `in_review` \| `homologated` \| `suspended` \| `ended` — template inicia em `draft` |

## Proibições

- Não pré-preencher alíquotas, bases ou FECP.
- Não emitir `status: homologated` a partir deste template sozinho.
- Alteração de regra publicada cria **nova** `version` (imutabilidade).

## Ligação

- Gate motor: `ruleStatus` / inventário H14 (`0` homologated)  
- Matriz RJ campos: `docs/matriz-rj-template.md` (H25)  
- Ratificação 131/26: `docs/ratificacao-131-26-checklist.md` (H28) quando aplicável

## CTs

- CT-t01: lista campos de §13.4 (id, modalidade, UFs, regime, refs, efeitos, status)  
- CT-t02: proíbe homologated automático / alíquotas  
- CT-t03: assert CI
