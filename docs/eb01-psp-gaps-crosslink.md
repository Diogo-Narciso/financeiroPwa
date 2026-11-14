# Crosslink — E-B01 webhook/mock ↔ PSP live gaps (H102 / H97 · H34)

**Status:** inventário cruzado · **não** altera ACL · **não** escolhe PSP · **não** fecha E-B01 / P11  
**Fontes:** `docs/eb01-ops-notes.md` (H97) · `docs/billing-webhook-auth-index.md` (H91) · `docs/psp-live-gaps.md` (H34)

## Comparativo

| Área | Doc | Nota |
|---|---|---|
| Mock webhook | H91 / H97 / E-B01 | sem sessão; sandbox only |
| PSP live | H34 / G-P11-* | mock_sandbox default; live bloqueado |

## Achado

E-B01 (mock sem AUTH) **não** substitui G-P11 (conta/chaves/DPA).  
Ops H97: não promover mock a ingress público; endurecimento HMAC/webhook = gap PSP (fora deste cartão).

## Proibições

- Não editar handlers / adapters neste PR.
- Não commitar chaves / account IDs.
- Não fechar E-B01 / P11 / E-R01.
- Não inventar MDR / preço.

## CTs

- CT-ep-01: cita E-B01 / H97 / H34 / G-P11  
- CT-ep-02: proíbe chaves / fechar P11  
- CT-ep-03: assert CI
