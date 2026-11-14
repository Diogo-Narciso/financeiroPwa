"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../ui.module.css";

type Company = { id: string; cnpj: string; legal_name: string };

export default function ImportarPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [companyId, setCompanyId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/companies")
      .then((r) => r.json())
      .then((data) => {
        const list = (data.companies ?? []) as Company[];
        setCompanies(list);
        if (list[0]) setCompanyId(list[0].id);
      })
      .catch(() => setError("Faça login para importar."));
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    fd.set("companyId", companyId);
    const res = await fetch("/api/imports/entries", { method: "POST", body: fd });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error ?? "Falha na importação.");
      return;
    }
    setResult(data);
  }

  return (
    <main className={styles.page}>
      <div className={styles.stack}>
        <div>
          <p className={styles.muted}>
            <Link href="/painel">← Painel</Link>
          </p>
          <h1 className={styles.h1}>Importar entradas (NF-e)</h1>
          <p className={styles.muted}>
            XML ou ZIP de NF-e modelo 55. Original imutável (SHA-256). Cota: 5
            NF-e válidas por CNPJ. Sem catálogo de saídas nesta etapa (opcional).
          </p>
        </div>

        <form className={`${styles.card} ${styles.stack}`} onSubmit={onSubmit}>
          <label className={styles.label}>
            Empresa
            <select
              className={styles.select}
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value)}
              required
            >
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.legal_name} ({c.cnpj})
                </option>
              ))}
            </select>
          </label>
          <label className={styles.label}>
            Arquivo XML ou ZIP
            <input className={styles.input} type="file" name="file" accept=".xml,.zip,application/zip,text/xml" required />
          </label>
          {error ? <p className={styles.error}>{error}</p> : null}
          <button className={styles.btn} type="submit" disabled={loading || !companyId}>
            {loading ? "Importando…" : "Enviar"}
          </button>
        </form>

        {result ? (
          <pre className={styles.card} style={{ overflow: "auto", fontSize: "0.85rem" }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        ) : null}

        <p className={styles.muted}>
          Catálogo de saídas / XLSX: stub E2 — análise de entradas não depende de
          catálogo. Sem regras de alíquota inventadas.
        </p>
      </div>
    </main>
  );
}
