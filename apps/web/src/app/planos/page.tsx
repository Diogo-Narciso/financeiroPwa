"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import styles from "../ui.module.css";

type PlanRow = {
  plan_id: string;
  code: string;
  name: string;
  kind: string;
  publishable: boolean;
  plan_version_id: string;
  version_label: string;
  status: string;
  price_monthly_cents: number | null;
  is_price_placeholder: boolean;
  commitment_months: number | null;
  notes: string;
  price_display: {
    cents: number;
    currency: string;
    official: boolean;
    label: string;
  } | null;
};

type SubState = {
  subscription: {
    id: string;
    status: string;
    plan_code: string;
    plan_name: string;
    contract_mode: string;
    cancel_at_period_end: boolean;
  } | null;
  contracts: Array<{ id: string; status: string; accepted_at: string | null }>;
  renewals: Array<{ policy: string; enabled: boolean; notes: string }>;
};

export default function PlanosPage() {
  const [plans, setPlans] = useState<PlanRow[]>([]);
  const [sub, setSub] = useState<SubState | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState("");

  async function refresh() {
    const [pRes, sRes] = await Promise.all([
      fetch("/api/billing/plans"),
      fetch("/api/billing/subscription"),
    ]);
    const pData = await pRes.json();
    const sData = await sRes.json();
    if (!pRes.ok) throw new Error(pData.error ?? "Falha ao listar planos");
    if (!sRes.ok) throw new Error(sData.error ?? "Falha ao carregar assinatura");
    setPlans(pData.plans);
    setSub(sData);
  }

  useEffect(() => {
    refresh().catch((err: Error) => setError(err.message));
  }, []);

  async function ensureTrial() {
    setError(null);
    setMessage(null);
    const res = await fetch("/api/billing/subscription", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "ensure_trial" }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Falha");
      return;
    }
    setMessage("Trial garantido (mock_sandbox).");
    await refresh();
  }

  async function acceptTrialContract(planVersionId: string) {
    setError(null);
    setMessage(null);
    const res = await fetch("/api/billing/subscription", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "accept_contract",
        planVersionId,
        contractMode: "trial",
        acceptContractTemplateCode: "terms_trial_v1",
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Falha no aceite");
      return;
    }
    setMessage(
      `Contrato aceito ${data.contractId}. Provider: ${data.provider}. Snapshot imutável gravado.`,
    );
    await refresh();
  }

  async function tryPaidScaffold(planVersionId: string) {
    setError(null);
    setMessage(null);
    const res = await fetch("/api/billing/subscription", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "accept_contract",
        planVersionId,
        contractMode: "monthly_flexible",
        acceptContractTemplateCode: "terms_paid_placeholder_v1",
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Falha");
      return;
    }
    setMessage(
      `Scaffold pago: status=${data.status}. ${data.warning ?? ""} Sem cobrança real (mock_sandbox).`,
    );
    await refresh();
  }

  async function onCancel(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setMessage(null);
    const res = await fetch("/api/billing/cancel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reason: cancelReason }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Falha");
      return;
    }
    setMessage(
      `Cancelamento registrado (${data.cancellation.id}). Multa: ${data.cancellation.fee_policy_status}.`,
    );
    setCancelReason("");
    await refresh();
  }

  function formatPrice(p: PlanRow) {
    if (!p.price_display) return "—";
    const reais = (p.price_display.cents / 100).toFixed(2);
    return `R$ ${reais} (${p.price_display.label})`;
  }

  return (
    <main className={styles.page}>
      <div className={styles.stack}>
        <div>
          <p className={styles.muted}>
            <Link href="/painel">← Painel</Link>
          </p>
          <h1 className={styles.h1}>Planos e cobrança</h1>
          <p className={styles.muted}>
            Adapter <strong>mock_sandbox</strong> — sem chaves de provedor real. Preços
            placeholder <strong>não são oficiais</strong>. Renovação por prazo fixo
            bloqueada até revisão jurídica.
          </p>
        </div>

        {error ? <p className={styles.error}>{error}</p> : null}
        {message ? <p className={styles.ok}>{message}</p> : null}

        <section className={`${styles.card} ${styles.stack}`}>
          <h2 style={{ margin: 0, fontSize: "1.05rem" }}>Assinatura atual</h2>
          {sub?.subscription ? (
            <ul className={styles.muted} style={{ margin: 0, paddingLeft: "1.1rem" }}>
              <li>
                {sub.subscription.plan_name} ({sub.subscription.plan_code}) —{" "}
                <code>{sub.subscription.status}</code> / {sub.subscription.contract_mode}
              </li>
              <li>cancel_at_period_end: {String(sub.subscription.cancel_at_period_end)}</li>
            </ul>
          ) : (
            <p className={styles.muted}>Nenhuma assinatura. Inicie o trial.</p>
          )}
          <button className={styles.btn} type="button" onClick={() => void ensureTrial()}>
            Garantir trial
          </button>
          {sub?.renewals?.length ? (
            <div>
              <h3 style={{ margin: "0 0 0.35rem", fontSize: "0.95rem" }}>Renovação</h3>
              <ul className={styles.muted} style={{ margin: 0, paddingLeft: "1.1rem" }}>
                {sub.renewals.map((r) => (
                  <li key={r.policy}>
                    {r.policy}: {r.enabled ? "ativo" : "bloqueado"} — {r.notes}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {sub?.contracts?.length ? (
            <div>
              <h3 style={{ margin: "0 0 0.35rem", fontSize: "0.95rem" }}>Contratos</h3>
              <ul className={styles.muted} style={{ margin: 0, paddingLeft: "1.1rem" }}>
                {sub.contracts.map((c) => (
                  <li key={c.id}>
                    <code>{c.id.slice(0, 8)}</code> — {c.status}{" "}
                    {c.accepted_at
                      ? `aceito ${new Date(c.accepted_at).toLocaleString("pt-BR")}`
                      : ""}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>

        <section className={`${styles.card} ${styles.stack}`}>
          <h2 style={{ margin: 0, fontSize: "1.05rem" }}>Catálogo</h2>
          <div style={{ overflowX: "auto" }}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Plano</th>
                  <th>Versão</th>
                  <th>Preço</th>
                  <th>Publicável</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((p) => (
                  <tr key={p.plan_version_id}>
                    <td>
                      {p.name} <code>{p.code}</code>
                      <div className={styles.muted} style={{ fontSize: "0.85rem" }}>
                        {p.notes}
                      </div>
                    </td>
                    <td>
                      {p.version_label} / {p.status}
                    </td>
                    <td>{formatPrice(p)}</td>
                    <td>{p.publishable ? "sim" : "não"}</td>
                    <td>
                      {p.kind === "trial" ? (
                        <button
                          className={styles.btn}
                          type="button"
                          onClick={() => void acceptTrialContract(p.plan_version_id)}
                        >
                          Aceitar termos trial
                        </button>
                      ) : (
                        <button
                          className={`${styles.btn} ${styles.btnSecondary}`}
                          type="button"
                          onClick={() => void tryPaidScaffold(p.plan_version_id)}
                        >
                          Scaffold pago
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className={`${styles.card} ${styles.stack}`}>
          <h2 style={{ margin: 0, fontSize: "1.05rem" }}>Cancelamento</h2>
          <p className={styles.muted}>
            Scaffold: solicita cancelamento; política de multa fica pending_legal_approval.
          </p>
          <form onSubmit={onCancel} className={styles.stack}>
            <label className={styles.label}>
              Motivo
              <textarea
                className={styles.textarea}
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                rows={3}
                required
              />
            </label>
            <button className={styles.btn} type="submit">
              Solicitar cancelamento
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
