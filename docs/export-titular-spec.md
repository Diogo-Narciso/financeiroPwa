# Spec — export de titular (H52 / gap H11)

**Status:** especificação de procedimento · **não** implementa endpoint · **não** fecha P10  
**Fontes:** `docs/lgpd-retencao.md` · H11 direitos do titular · H46 (sem misturar tenants)

## Objetivo

Descrever o fluxo MVP de acesso/export dos dados do titular sob controle da organização controladora.

## Fluxo MVP

1. Canal: ticket de suporte da organização controladora (não self-service público).
2. Evidência de legitimidade do solicitante (controlador / representante).
3. Escopo: **um** `tenant_id` — proibido misturar tenants.
4. Conteúdo mínimo (quando existir no produto): cadastro empresa no tenant, metadados de conta/auth do tenant, referências a `audit_events` do período pedido (sem PII desnecessária em logs).
5. Entrega: pacote offline + registro em `audit_events` (`titular.export.requested` / `titular.export.delivered` — nomes draft).
6. Eliminação: fora deste cartão; avaliar legal hold / custódia XML antes de qualquer purge.

## Campos de política (vazios até implementação)

| Campo | Tipo | Nota |
|---|---|---|
| `exportTitularEndpointExists` | boolean | **false** neste pacote |
| `selfServicePublic` | boolean | false (MVP) |
| `requiresTicket` | boolean | true |
| `tenantIsolationRequired` | boolean | true (H17) |

## Proibições

- Não criar rota pública de export titular neste PR.
- Não misturar tenants no dump.
- Não inventar campos fiscais/PSP.
- Não marcar P10 como fechado.

## CTs

- CT-et-01: cita H11 / titular / tenant  
- CT-et-02: `exportTitularEndpointExists` false + proíbe self-service  
- CT-et-03: assert CI
