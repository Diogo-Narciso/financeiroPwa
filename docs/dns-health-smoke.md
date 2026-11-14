# Smoke — DNS → health (H45 / pós H39·H38)

**Status:** procedimento draft · **não** configura DNS · **não** fecha P13  
**Pré:** H39 evidências domínio · H38 `/api/health` · H44 renovação TLS

## Objetivo

Encadear verificação **DNS resolve → TLS handshake → GET /api/health** sem hardcodar FQDN.

## Procedimento (placeholders)

```bash
# DOMAIN vem de evidência H39 E-D01 (não commitado)
DOMAIN="${DOMAIN:?set DOMAIN from H39 evidence}"

# 1) DNS
getent hosts "$DOMAIN" || dig +short "$DOMAIN"

# 2) TLS (sem gravar chave)
echo | openssl s_client -servername "$DOMAIN" -connect "$DOMAIN:443" 2>/dev/null | openssl x509 -noout -dates

# 3) Health
curl -sfS "https://$DOMAIN/api/health"
```

## Campos de evidência

| ID | Campo | Situação |
|---|---|---|
| S-D01 | `dnsResolves` | aberto |
| S-D02 | `tlsHandshakeOk` | aberto |
| S-D03 | `healthHttpsOk` | aberto (H38 no domínio) |
| S-D04 | `checkedAt` | null até execução |

## Proibições

- Não inventar/commitar FQDN de produção.
- Não marcar P13 D01/M01 como feitos.
- Não logar certificados privados.

## CTs

- CT-dns-01: cita DNS + TLS + `/api/health` + H39/H38  
- CT-dns-02: proíbe FQDN hardcoded / P13 aberto  
- CT-dns-03: assert CI
