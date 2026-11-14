"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../ui.module.css";

type Company = { id: string; legal_name: string };

export default function CalculoPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [companyId, setCompanyId] = useState("");
  const [out, setOut] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/companies")
      .then((r) => r.json())
      .then((d) => {
        const list = (d.companies ?? []) as Company[];
        setCompanies(list);
        if (list[0]) setCompanyId(list[0].id);
      });
  }, []);

  async function run(mode: "production_pending" | "demo_arithmetic", demoCaseId?: string) {
    setError(null);
    setOut(null);
    const res = await fetch("/api/tax-runs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ companyId, mode, demoCaseId }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Falha");
      return;
    }
    setOut(data);
  }

  return (
    <main className={styles.page}>
      <div className={styles.stack}>
        <div>
          <p className={styles.muted}>
            <Link href="/painel">← Painel</Link>
          </p>
          <h1 className={styles.h1}>Cálculo do DIFAL</h1>
          <p className={styles.muted}>
            Módulo aquisição contribuinte (estrutura). Venda a não contribuinte
            desabilitada. Sem regra homologada → pendência (nunca R$ 0 como não
            incidência). Demos aritméticos explícitos.
          </p>
        </div>
        <div className={`${styles.card} ${styles.stack}`}>
          <label className={styles.label}>
            Empresa
            <select className={styles.select} value={companyId} onChange={(e) => setCompanyId(e.target.value)}>
              {companies.map((c) => (
                <option key={c.id} value={c.id}>{c.legal_name}</option>
              ))}
            </select>
          </label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            <button className={styles.btn} type="button" onClick={() => run("production_pending")}>
              Rodar (produção → pendente)
            </button>
            <button className={`${styles.btn} ${styles.btnSecondary}`} type="button" onClick={() => run("demo_arithmetic", "ARIT-A")}>
              Demo ARIT-A
            </button>
            <button className={`${styles.btn} ${styles.btnSecondary}`} type="button" onClick={() => run("demo_arithmetic", "ARIT-C")}>
              Demo ARIT-C
            </button>
          </div>
          {error ? <p className={styles.error}>{error}</p> : null}
        </div>
        {out ? (
          <pre className={styles.card} style={{ overflow: "auto", fontSize: "0.85rem" }}>
            {JSON.stringify(out, null, 2)}
          </pre>
        ) : null}
      </div>
    </main>
  );
}
