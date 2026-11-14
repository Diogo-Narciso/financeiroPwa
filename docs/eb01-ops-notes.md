# Ops notes — E-B01 billing webhook/mock (H97 / H91)

**Status:** notas operacionais · **não** altera ACL · **não** fecha E-B01 / E-R01  
**Fontes:** `docs/billing-webhook-auth-index.md` (H91) · `apps/web/src/app/api/billing/webhook/mock/route.ts`

## Contexto

| Path | Sessão | Uso |
|---|---|---|
| `billing/webhook/mock` | **sem** `requireUser` | sandbox / homologação (E-B01) |
| `billing/plans` · `subscription` · `cancel` | AUTH | produto (E-R01) |

## Notas ops (draft)

1. Manter o mock fora do caminho de produção; não promover URL mock a ingress público.
2. Em incidentes de billing, distinguir falha AUTH (E-R01) de tráfego mock (E-B01).
3. Qualquer endurecimento de assinatura/HMAC do webhook é gap PSP — **fora** deste cartão.

## Campos

| Campo | Valor |
|---|---|
| `aclChangedInThisPR` | **false** |
| `eB01Closed` | **false** |

## Proibições

- Não editar o handler webhook/mock neste PR.
- Não inventar PSP cert / fechar E-B01 ou E-R01.
- Não promover mock a produção neste cartão.

## CTs

- CT-eo-01: cita E-B01 / H91 / webhook/mock  
- CT-eo-02: aclChangedInThisPR false · eB01Closed false  
- CT-eo-03: assert CI
