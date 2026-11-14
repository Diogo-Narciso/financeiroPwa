# Dual-calc harness — seed (H33 / P14)

**Status:** schema de seed · **sem** resultados numéricos · **não** homologa  
**Pré:** H29 protocolo · H16 fixtures · H26 ARIT vs planilha (método)

## Objetivo

Definir o **formato mínimo** de um harness local que registra camadas A/B do dual calc (H29) para amostras sintéticas — sem preencher alíquotas nem marcar `homologated`.

## Seed (campos)

| Campo | Tipo | Obrigatório | Nota |
|---|---|---|---|
| `sampleId` | string | sim | ID estável da amostra |
| `fixturePath` | string | sim | Path sob `scripts/fixtures/` (H16) |
| `sha256` | string \| null | sim | Hash do XML sintético |
| `competenceDate` | ISO date \| null | sim | Competência do ensaio |
| `originUf` / `destinationUf` | string \| null | sim | Contexto UF |
| `layerA` | object | sim | `{ engine: "sandbox", ruleStatus, outputRef: null }` |
| `layerB` | object | sim | `{ method: "spreadsheet\|external", outputRef: null }` |
| `divergenceNotes` | string[] | sim | Lista (pode ser `[]` só se ambos null) |
| `fiscalApproved` | boolean | sim | **sempre `false`** neste seed |

## Exemplo vazio (não executar como verdade)

```json
{
  "sampleId": "SYNTH-001",
  "fixturePath": "scripts/fixtures/nfe/",
  "sha256": null,
  "competenceDate": null,
  "originUf": null,
  "destinationUf": null,
  "layerA": { "engine": "sandbox", "ruleStatus": "demo", "outputRef": null },
  "layerB": { "method": "spreadsheet", "outputRef": null },
  "divergenceNotes": [],
  "fiscalApproved": false
}
```

## Proibições

- Não copiar resultado demo ARIT como camada B homologada.
- Não promover `ruleStatus` → `homologated` via harness.
- Não commitar XML com PII (H16/H29).

## CTs

- CT-dc-01: cita H29 dual calc + H16  
- CT-dc-02: `fiscalApproved` false / proíbe homologated  
- CT-dc-03: assert CI
