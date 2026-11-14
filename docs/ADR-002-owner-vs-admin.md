# ADR-002 — Papéis `owner` vs `admin` (H47 / G-R02)

**Status:** proposto · **não** altera memberships · **não** muda ACL em código  
**Contexto:** H37 mapa roles · H42 G-R02 · handlers tratam owner≈admin

## Contexto

No AS-IS, vários gates aceitam `owner` e `admin` indistintamente (homologação, mutações sensíveis). Não há documento que diga se a igualdade é intencional.

## Decisão (draft para aprovação PM/security)

1. **`owner`**: criador da org / bootstrap; único que pode transferir ownership (futuro) e encerrar tenant.  
2. **`admin`**: operação diária com os mesmos poderes de mutação **exceto** transferência/encerramento (quando existirem).  
3. Até haver endpoints de transferência/encerramento, **manter** checagens `owner|admin` iguais é aceitável, desde que documentado.  
4. Qualquer poder fiscal `homologated` continua **fora** de role — responsável fiscal humano.

## Consequências

- G-R02 → “intencional por enquanto” até H48/H49 ou ADR revisitado.  
- Não criar role nova neste cartão.  
- Follow-ups: H48/H49 alinhar AUTH-only routes; não confundir com este ADR.

## Proibições

- Não promover admin/owner a `homologated`.
- Não abrir cross-tenant (H17).

## CTs

- CT-adr-01: distingue owner vs admin  
- CT-adr-02: cita G-R02 / H37 / não altera ACL agora  
- CT-adr-03: assert CI
