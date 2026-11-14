# Checklist de lançamento (E7 scaffold)

Espelho operacional de [`02_ENTREGAS_E_TESTES.md`](./02_ENTREGAS_E_TESTES.md) §3 e pendências de [`03_FONTES_E_PENDENCIAS.md`](./03_FONTES_E_PENDENCIAS.md) §5.

Os itens também vivem no banco (`launch_checklist_items`, `activation_pendencies`) via migração `008_e7_homologation_launch.sql`. **Nada começa aprovado.**

## Status do produto (rebuild)

| Etapa | Situação |
|---|---|
| E0 Fundação | Entregue |
| E1 Cadastro / cotas | Entregue |
| E2 Importação XML | Entregue |
| E3 Classificação | Entregue |
| E4 Motor (demo + pending) | Entregue — **sem** regra `homologated` |
| E5 Export ZIP | Entregue — ERP **não** certificado |
| E6 Planos / mock billing | Entregue — preços placeholder **não** oficiais |
| E7 Homologação / publicação | Scaffold — lançamento **não** aprovado |

## Pendente para produção

1. **Regras fiscais homologadas** (P01–P05, P14) com fonte, competência e aprovação do responsável fiscal.
2. **Pagamentos reais** (P11) — hoje só `mock_sandbox`; spike/contrato em [`pagamento-adapter-spike.md`](./pagamento-adapter-spike.md) (H12). Ainda **sem** PSP/contas.
3. **Certificação ERP** (P06) após importação real documentada.
4. **Comercial/jurídico** (P07–P09, P12): preços oficiais, contratos, multa, emissão fiscal SaaS.
5. **Privacidade** (P10) e **ops** (P13): LGPD operacional — draft em [`lgpd-retencao.md`](./lgpd-retencao.md) + `RETENTION_POLICY` (shared); ainda **exige** revisão jurídica. Backup/restore ensaiado, domínio/suporte.

## Comandos

```bash
pnpm db:migrate
pnpm e7:smoke          # com pnpm dev
bash scripts/e7-backup-restore-drill.sh
```

UI: `/homologacao` · API: `GET /api/homologation/status`.
