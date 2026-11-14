# Índice — evidências domínio / TLS (H39 / P13 D01–D02)

**Status:** campos de evidência · **não** registra domínio real · **não** fecha P13  
**Pré:** H31 checklist · H38 healthcheck smoke

## Objetivo

Listar o que ops deve anexar antes de preencher `productionDomain` / marca (H31 D01–D02).

## Evidências (vazias)

| ID | Campo | Evidência mínima | Situação |
|---|---|---|---|
| E-D01 | `domainName` | FQDN escolhido pelo proprietário | aberto |
| E-D02 | `dnsRecords` | A/AAAA ou CNAME documentados | aberto |
| E-D03 | `tlsIssuer` | CA / cert (Let’s Encrypt etc.) — sem chave privada | aberto |
| E-D04 | `tlsExpiresAt` | Data de expiração + renovação | aberto |
| E-D05 | `httpsRedirectOk` | Smoke HTTP→HTTPS | aberto |
| E-D06 | `healthOnDomain` | `curl https://$domain/api/health` (H38) | aberto |
| E-D07 | `brandAssetsApproved` | Aprovação de marca (H31 D02) | aberto |

## Proibições

- Não hardcodar FQDN de produção neste repo.
- Não commitar certificados privados / chaves.
- Não marcar P13 D01 como feito.

## CTs

- CT-dom-01: cita P13 D01 / TLS / health  
- CT-dom-02: proíbe chave privada / afirma aberto  
- CT-dom-03: assert CI
