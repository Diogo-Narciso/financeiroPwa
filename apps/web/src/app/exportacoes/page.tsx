"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../ui.module.css";

type Company = { id: string; legal_name: string };

export default function ExportacoesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [companyId, setCompanyId] = useState("");
  const [out, setOut] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/companies").then((r) => r.json()).then((d) => {
      const list = (d.companies ?? []) as Company[];
      setCompanies(list);
      if (list[0]) setCompanyId(list[0].id);
    });
  }, []);

  async function exportZip() {
    setError(null);
    setOut(null);
    const res = await fetch("/api/exports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ companyId }),
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
          <p className={styles.muted}><Link href="/painel">← Painel</Link></p>
          <h1 className={styles.h1}>Exportar para escrituração</h1>
          <p className={styles.muted}>
            ZIP com <code>/originais/</code> (XML imutável + SHA-256), mapeamento CFOP auxiliar,
            memória, pendências e manifesto. ERP não homologado.
          </p>
        </div>
        <div className={`${styles.card} ${styles.stack}`}>
          <label className={styles.label}>
            Empresa
            <select className={styles.select} value={companyId} onChange={(e) => setCompanyId(e.target.value)}>
              {companies.map((c) => <option key={c.id} value={c.id}>{c.legal_name}</option>)}
            </select>
          </label>
          <button className={styles.btn} type="button" onClick={exportZip} disabled={!companyId}>
            Gerar ZIP
          </button>
          {error ? <p className={styles.error}>{error}</p> : null}
        </div>
        {out ? (
          <div className={`${styles.card} ${styles.stack}`}>
            <pre style={{ margin: 0, overflow: "auto", fontSize: "0.85rem" }}>{JSON.stringify(out, null, 2)}</pre>
            {"downloadPath" in (out as object) ? (
              <a className={styles.btn} href={(out as { downloadPath: string }).downloadPath}>
                Baixar ZIP
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </main>
  );
}
