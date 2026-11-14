# Índice — gaps PSP live pós-H12 (H34 / P11)

**Status:** inventário de gaps · **não** escolhe PSP · **não** ativa cobrança  
**Fontes:** `pagamento-adapter-spike.md` (H12) · P11 · P07 preços · `lancamento-checklist.md`

## AS-IS (após H12)

| Peça | Situação |
|---|---|
| `MockSandboxBillingProvider` | Default ativo |
| `UnconfiguredLiveBillingProvider` | Fail-closed (recusa checkout) |
| `PaymentAdapter` contrato | Spike tipado no código |
| Conta / chaves PSP | **ausentes** (proibido no repo) |
| Preço oficial | P07 aberto (H32 mapa) |

## Gaps bloqueadores para live

| ID | Gap | Dependência | Situação |
|---|---|---|---|
| G-P11-01 | Decisão de PSP (MP / Stripe / outro) | comercial + jurídico | aberto |
| G-P11-02 | Conta PJ + KYC no gateway | proprietário | aberto |
| G-P11-03 | Segredos webhook/API fora do git | ops + secrets store | aberto |
| G-P11-04 | `BILLING_PROVIDER` ≠ mock com gate H12 completo | H12 checklist | aberto |
| G-P11-05 | Preço `approved` + `!is_price_placeholder` | P07 / H32 | aberto |
| G-P11-06 | Item homologação “pagamentos reais” | E7 checklist | aberto |
| G-P11-07 | DPA / tratamento de dados do PSP | P10 / jurídico | aberto |

## Proibições

- Não commitar chaves, tokens ou account IDs.
- Não marcar P11 como fechado.
- Não inventar taxa de MDR ou preço de plano.

## Próximo

Após G-P11-01+02+05: implementação do adapter concreto (cartão futuro) — fora de H34.

## CTs

- CT-psp-01: cita H12 / P11 / mock_sandbox  
- CT-psp-02: lista gaps e afirma aberto / proíbe chaves no repo  
- CT-psp-03: assert CI
