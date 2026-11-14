"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BRAZIL_UFS } from "@portal-difal/shared";
import styles from "../../ui.module.css";

export default function NovaEmpresaPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/companies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cnpj: fd.get("cnpj"),
        legalName: fd.get("legalName"),
        tradeName: fd.get("tradeName"),
        uf: fd.get("uf") || undefined,
        municipality: fd.get("municipality"),
        stateRegistration: fd.get("stateRegistration"),
      }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error ?? "Não foi possível cadastrar.");
      return;
    }
    router.push(`/empresas/${data.id}`);
    router.refresh();
  }

  return (
    <main className={styles.page}>
      <div className={styles.stack}>
        <div>
          <p className={styles.muted}>
            <Link href="/empresas">← Empresas</Link>
          </p>
          <h1 className={styles.h1}>Nova empresa (CNPJ)</h1>
          <p className={styles.muted}>
            Consome 1 vaga do teste (máx. 3). CNPJ não pode ser trocado só para
            reiniciar cota.
          </p>
        </div>
        <form className={`${styles.card} ${styles.stack}`} onSubmit={onSubmit}>
          <label className={styles.label}>
            CNPJ (14 caracteres)
            <input className={styles.input} name="cnpj" required placeholder="00000000000191" />
          </label>
          <label className={styles.label}>
            Razão social
            <input className={styles.input} name="legalName" required />
          </label>
          <label className={styles.label}>
            Nome fantasia
            <input className={styles.input} name="tradeName" />
          </label>
          <div className={styles.row}>
            <label className={styles.label}>
              UF
              <select className={styles.select} name="uf" defaultValue="RJ">
                <option value="">—</option>
                {BRAZIL_UFS.map((uf) => (
                  <option key={uf} value={uf}>
                    {uf}
                  </option>
                ))}
              </select>
            </label>
            <label className={styles.label}>
              Município
              <input className={styles.input} name="municipality" />
            </label>
            <label className={styles.label}>
              Inscrição estadual
              <input className={styles.input} name="stateRegistration" />
            </label>
          </div>
          {error ? <p className={styles.error}>{error}</p> : null}
          <button className={styles.btn} disabled={loading} type="submit">
            {loading ? "Salvando…" : "Salvar empresa"}
          </button>
        </form>
      </div>
    </main>
  );
}
