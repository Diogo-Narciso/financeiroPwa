# Fixtures públicas sem PII real (H16)

**Status:** política + assert CI · fixtures em `scripts/fixtures/nfe/`  
**Agente:** coder / security

## Política

1. XML de demo usa **CNPJs/chaves sintéticos** (padrões óbvios de teste), nunca dados de cliente.
2. Nomes `*DEMO*`, `FORNECEDOR DEMO`, `EMPRESA DESTINO DEMO`.
3. Proibido: e-mail pessoal, CPF, telefone, endereço completo real, XML de produção.
4. Novos fixtures devem passar `scripts/h16-fixtures-assert.mjs`.

## Inventário atual

| Arquivo | Nota |
|---|---|
| `nfe-entrada-demo.xml` | Chave/CNPJ sintéticos; emit/dest DEMO |
| `nfe-entrada-variante.xml` | Variante de teste |

## CTs

- CT-f01: fixtures existem
- CT-f02: sem `@` (e-mail) / sem padrão CPF `\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}`
- CT-f03: nomes contêm DEMO ou são curtos de teste
