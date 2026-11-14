# Checklist — ratificação nacional Convênio ICMS 131/2026 (H28 / P05)

**Status:** campos obrigatórios · **não** conclui existência/ausência da ratificação · **não** ativa 2027/2028  
**Fontes:** [F09] `03_FONTES_E_PENDENCIAS.md` · H15 F09 · G-F05

## Aviso

O Convênio 131/2026 (cláusula quinta) condiciona a entrada em vigor à **publicação da ratificação nacional**.  
Este cartão só define o **checklist de campos** que o responsável fiscal deve preencher.  
**Não** afirmar que a ratificação “existe” ou “não existe” a partir deste doc.  
**Proibido** ativar regras para 2027/2028 sem cadeia validada.

## Campos (vazios até conferência)

| Campo | Tipo | Obrigatório | Nota |
|---|---|---|---|
| `convenioRef` | string | sim | Fixo sugerido: `CV131_26` / F09 |
| `publicationDate` | ISO date \| null | sim | Data de publicação do convênio (null = não conferida) |
| `publicationUrl` | URL \| null | sim | URL oficial CONFAZ |
| `ratificationPublished` | boolean \| null | sim | `null` = não decidido; **não** default true/false |
| `ratificationPublicationDate` | ISO date \| null | se publicada | Data da publicação da ratificação nacional |
| `ratificationOfficialUrl` | URL \| null | se publicada | Fonte oficial da ratificação |
| `effectsStartDate` | ISO date \| null | sim | Início dos efeitos **após** cadeia válida |
| `effectsEndDate` | ISO date \| null | sim | Ex.: cláusula de prorrogação — só após validação |
| `stateImplementationStatus` | enum draft | sim | `not_reviewed` \| `pending` \| `documented` \| `blocked` |
| `stateImplementationNotes` | string | não | UF / ato estadual quando exigido |
| `lastReviewedAt` | ISO datetime \| null | sim | Última conferência humana |
| `reviewerName` | string \| null | sim | Responsável fiscal |
| `activationAllowed` | boolean | sim | **sempre `false`** neste pacote até aprovação explícita fora do CI |

## Proibições

- Não pré-preencher `ratificationPublished` como verdadeiro.
- Não ativar vigência 2027/2028 no motor a partir deste checklist.
- Não cadastrar “52/91 prorrogado = benefício automático”.

## Ligação

- Evidências 52/91: `docs/convenio-52-91-evidencias.md` (F09)
- Gap: `docs/fiscal-gaps.md` G-F05 · matriz P05

## CTs

- CT-r01: doc cita F09 / 131/26 / ratificação  
- CT-r02: proíbe ativar 2027/2028 sem cadeia  
- CT-r03: `activationAllowed` permanece false neste pacote
