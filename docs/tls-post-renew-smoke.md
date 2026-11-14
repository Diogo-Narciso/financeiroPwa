# Smoke — pós-renovação TLS (H50 / H44 T-R06)

**Status:** procedimento draft · **não** renova cert · **não** fecha P13  
**Pré:** H44 T-R06 · H45 DNS→health · H39 evidências

## Objetivo

Após renovação TLS, revalidar handshake + `/api/health` no domínio (placeholder).

## Procedimento

```bash
DOMAIN="${DOMAIN:?set from H39 E-D01}"
# Handshake + datas
echo | openssl s_client -servername "$DOMAIN" -connect "$DOMAIN:443" 2>/dev/null | openssl x509 -noout -dates
# Health
curl -sfS "https://$DOMAIN/api/health"
# Preencher H44 T-R06 postRenewHealthOk = true só com evidência
```

## Campos

| ID | Campo | Situação |
|---|---|---|
| S-R01 | `postRenewHealthOk` | aberto (H44 T-R06) |
| S-R02 | `checkedAt` | null até execução |
| S-R03 | `tlsNotBefore` / `tlsNotAfter` | null até openssl |

## Proibições

- Não hardcodar FQDN.
- Não marcar P13 como feito.
- Não commitar chave privada.

## CTs

- CT-pr-01: cita H44 T-R06 / H45 / health  
- CT-pr-02: proíbe FQDN / P13 aberto  
- CT-pr-03: assert CI
