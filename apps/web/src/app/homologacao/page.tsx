"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../ui.module.css";

type Board = {
  frank: {
    functional: string[];
    demonstration_only: string[];
    needs_homologation_for_production: string[];
    flags: {
      checklistProgress: { done: number; total: number };
      openPendencies: number;
      pendenciesTotal: number;
      hasHomologatedRule: boolean;
      erpHomologated: boolean;
      paidPublishable: boolean;
      liveBillingEnabled: boolean;
      launchApproved: boolean;
    };
  };
  checklist: Array<{ code: string; section: string; title: string; status: string; evidence: string }>;
  activationPendencies: Array<{
    code: string;
    title: string;
    category: string;
    blocks: string;
    status: string;
    owner_role: string;
  }>;
  domains: Array<{ code: string; title: string; status: string; evidence_notes: string }>;
  disclaimer: string;
};

export default function HomologacaoPage() {
  const [board, setBoard] = useState<Board | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function refresh() {
    const res = await fetch("/api/homologation/status");
    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? "Falha");
    setBoard(data);
  }

  useEffect(() => {
    refresh().catch((e: Error) => setError(e.message));
  }, []);

  async function snapshot() {
    setError(null);
    setMessage(null);
    const res = await fetch("/api/homologation/status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "snapshot" }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Falha");
      return;
    }
    setMessage(`Snapshot ${data.snapshot.id} gravado. launch_approved=${data.snapshot.launch_approved}`);
    await refresh();
  }

  if (!board) {
    return (
      <main className={styles.page}>
        <p className={styles.muted}>{error ?? "Carregando…"}</p>
      </main>
    );
  }

  const f = board.frank.flags;

  return (
    <main className={styles.page}>
      <div className={styles.stack}>
        <div>
          <p className={styles.muted}>
            <Link href="/painel">← Painel</Link>
          </p>
          <h1 className={styles.h1}>Homologação e lançamento</h1>
          <p className={styles.muted}>{board.disclaimer}</p>
        </div>

        {error ? <p className={styles.error}>{error}</p> : null}
        {message ? <p className={styles.ok}>{message}</p> : null}

        <section className={`${styles.card} ${styles.stack}`}>
          <h2 style={{ margin: 0, fontSize: "1.05rem" }}>Estado atual</h2>
          <ul className={styles.muted} style={{ margin: 0, paddingLeft: "1.1rem" }}>
            <li>
              Checklist: {f.checklistProgress.done}/{f.checklistProgress.total}
            </li>
            <li>
              Pendências P01–P14 abertas: {f.openPendencies}/{f.pendenciesTotal}
            </li>
            <li>Regra fiscal homologated: {String(f.hasHomologatedRule)}</li>
            <li>ERP homologado: {String(f.erpHomologated)}</li>
            <li>Oferta paga publicável: {String(f.paidPublishable)}</li>
            <li>Cobrança real: {String(f.liveBillingEnabled)}</li>
            <li>
              Lançamento aprovado: <strong>{String(f.launchApproved)}</strong>
            </li>
          </ul>
          <button className={styles.btn} type="button" onClick={() => void snapshot()}>
            Gravar snapshot de readiness
          </button>
        </section>

        <section className={`${styles.card} ${styles.stack}`}>
          <h2 style={{ margin: 0, fontSize: "1.05rem" }}>Funcional (E0–E6)</h2>
          <ul style={{ margin: 0, paddingLeft: "1.1rem" }}>
            {board.frank.functional.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </section>

        <section className={`${styles.card} ${styles.stack}`}>
          <h2 style={{ margin: 0, fontSize: "1.05rem" }}>Apenas demonstração</h2>
          <ul style={{ margin: 0, paddingLeft: "1.1rem" }}>
            {board.frank.demonstration_only.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </section>

        <section className={`${styles.card} ${styles.stack}`}>
          <h2 style={{ margin: 0, fontSize: "1.05rem" }}>Pendente para produção</h2>
          <ul style={{ margin: 0, paddingLeft: "1.1rem" }}>
            {board.frank.needs_homologation_for_production.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </section>

        <section className={`${styles.card} ${styles.stack}`}>
          <h2 style={{ margin: 0, fontSize: "1.05rem" }}>Pendências de ativação (docs/03)</h2>
          <div style={{ overflowX: "auto" }}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Categoria</th>
                  <th>Definição</th>
                  <th>Bloqueia</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {board.activationPendencies.map((p) => (
                  <tr key={p.code}>
                    <td>
                      <code>{p.code}</code>
                    </td>
                    <td>{p.category}</td>
                    <td>{p.title}</td>
                    <td className={styles.muted}>{p.blocks}</td>
                    <td>{p.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className={`${styles.card} ${styles.stack}`}>
          <h2 style={{ margin: 0, fontSize: "1.05rem" }}>Checklist de lançamento (docs/02)</h2>
          <ul style={{ margin: 0, paddingLeft: "1.1rem" }}>
            {board.checklist.map((c) => (
              <li key={c.code}>
                <code>{c.code}</code> [{c.section}] {c.title} — <strong>{c.status}</strong>
              </li>
            ))}
          </ul>
        </section>

        <section className={`${styles.card} ${styles.stack}`}>
          <h2 style={{ margin: 0, fontSize: "1.05rem" }}>Domínios de homologação</h2>
          <ul style={{ margin: 0, paddingLeft: "1.1rem" }}>
            {board.domains.map((d) => (
              <li key={d.code}>
                <code>{d.code}</code> — {d.title}: <strong>{d.status}</strong>
                <div className={styles.muted} style={{ fontSize: "0.85rem" }}>
                  {d.evidence_notes}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
