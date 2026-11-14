# ADR-001 — Canal PWA / mobile

**Status:** Aceito (adiar scaffold nativo)  
**Data:** 2026-11-14  
**História:** H8 · fonte H2-A3  
**Contexto:** README e escopo prometem web + aplicativo (PWA/mobile) com a mesma conta e regras.

## Decisão

1. **Canal primário agora:** `apps/web` (Next.js) — único app entregue no monorepo pós-E7.
2. **PWA:** adiada. Não criar `apps/mobile` nem service worker neste ciclo.
3. **Quando retomar:** após gate fiscal `homologated` mínimo e estabilidade de API/auth (pós H9/H12 conforme prioridade de backlog).
4. **Forma futura preferida:** PWA instalável reutilizando as mesmas rotas/API de `apps/web` (sem segundo backend). Shell nativo (Capacitor/Expo) só se a PWA não cobrir push/offline críticos — nova ADR.

## Consequências

- Escopo de produto permanece “web + app no futuro”; documentação deixa de parecer que o app mobile já existe.
- Nenhum pacote mobile no workspace até nova história promover o scaffold.
- Sem impacto em schema, cotas ou motor fiscal.

## Alternativas rejeitadas agora

| Opção | Motivo |
|---|---|
| Scaffold `apps/mobile` vazio | Ruído de CI/DX sem valor de aceite |
| PWA mínima já | Fora do caminho crítico pós-E7; competiria com H9/H12/H18 |

## Referências

- `docs/escopo-produto.md` — canais web + aplicativo
- `docs/plano-rebuild.md` — stack proposta E0
- `README.md` — status E0–E7
