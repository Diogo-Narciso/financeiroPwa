# Checklist — renovação TLS (H44 / P13)

**Status:** campos operacionais · **não** renova certificado · **não** fecha P13  
**Pré:** H39 evidências domínio/TLS · H38 healthcheck

## Objetivo

Definir o checklist de **renovação** (além da emissão inicial E-D03/E-D04) sem hardcodar CA nem domínio.

## Campos

| ID | Campo | Obrigatório | Nota |
|---|---|---|---|
| T-R01 | `tlsExpiresAt` | sim | Espelha H39 E-D04 — null até evidência |
| T-R02 | `renewalLeadDays` | sim | Draft sugerido 30 — **não** contratual |
| T-R03 | `autoRenewEnabled` | boolean \| null | null = não decidido |
| T-R04 | `renewalOwner` | string \| null | Contato ops |
| T-R05 | `lastRenewalAt` | ISO \| null | |
| T-R06 | `postRenewHealthOk` | boolean \| null | Reexecutar H38 no domínio (H39 E-D06) |
| T-R07 | `alertChannel` | string \| null | H31 M02 |

## Proibições

- Não commitar chave privada / fullchain.
- Não marcar P13/D01 como feito.
- Não inventar FQDN de produção.

## CTs

- CT-tls-01: cita renovação / H39 / H38  
- CT-tls-02: proíbe chave privada / P13 aberto  
- CT-tls-03: assert CI
