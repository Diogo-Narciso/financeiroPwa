# Protocolo — amostras XML anonimizadas + dual calc (H29 / P14)

**Status:** protocolo operacional · **não** homologa cálculo  
**Relacionados:** H16 fixtures · H15 evidências · H4/H23 gaps

## Objetivo

Definir como coletar/usar amostras para homologação ponta a ponta **sem** PII real e com conferência independente de valores.

## Dual calc

| Camada | Responsável | Artefato |
|---|---|---|
| A — Motor (sandbox) | técnico | output `evaluateItemTax` com `ruleStatus` explícito |
| B — Independente | fiscal / planilha controlada | planilha ou calc externo na **mesma** competência |

Aceite só se A e B forem confrontados **e** divergências documentadas. Demo ARIT **não** conta como camada B homologada.

## Regras de amostra

1. Preferir fixtures sintéticas (`scripts/fixtures/nfe/`, política H16).
2. XML real só se anonimizado (CNPJ/chave/mascara) e fora do git público se sensível.
3. Registrar: origem, competência, UF, modalidade, hash SHA-256, aprovação do dono do dado.
4. Proibido commitar XML de produção com PII.

## Checklist por amostra

- [ ] Anonimização / sintético OK  
- [ ] Hash registrado  
- [ ] Dual calc A/B executado  
- [ ] `ruleStatus` ≠ `homologated` até aprovação fiscal  
- [ ] Divergências listadas (não “forçadas” a zero)

## CTs

- CT-p14-01: doc cita dual calc + H16  
- CT-p14-02: proíbe PII / produção no git  
- CT-p14-03: assert CI
