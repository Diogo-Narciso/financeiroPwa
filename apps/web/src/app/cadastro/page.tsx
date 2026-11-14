"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { APP_NAME } from "@portal-difal/shared";
import styles from "../ui.module.css";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: fd.get("email"),
        password: fd.get("password"),
        displayName: fd.get("displayName"),
        orgName: fd.get("orgName"),
        orgKind: fd.get("orgKind"),
      }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error ?? "Falha no cadastro.");
      return;
    }
    router.push("/painel");
    router.refresh();
  }

  return (
    <main className={styles.page}>
      <div className={styles.stack}>
        <div>
          <p className={styles.muted}>
            <Link href="/">{APP_NAME}</Link> · teste gratuito
          </p>
          <h1 className={styles.h1}>Criar conta</h1>
          <p className={styles.muted}>
            Escritório ou pessoa física/profissional. Sem cartão. Cotas: 3 CNPJs e
            5 NF-e de entrada por CNPJ.
          </p>
        </div>
        <form className={`${styles.card} ${styles.stack}`} onSubmit={onSubmit}>
          <label className={styles.label}>
            Tipo de organização
            <select className={styles.select} name="orgKind" required defaultValue="accounting_firm">
              <option value="accounting_firm">Escritório contábil</option>
              <option value="individual">Pessoa física / profissional</option>
              <option value="company">Empresa (uso próprio)</option>
            </select>
          </label>
          <label className={styles.label}>
            Nome da organização
            <input className={styles.input} name="orgName" required />
          </label>
          <label className={styles.label}>
            Seu nome
            <input className={styles.input} name="displayName" />
          </label>
          <label className={styles.label}>
            E-mail
            <input className={styles.input} type="email" name="email" required />
          </label>
          <label className={styles.label}>
            Senha (mín. 8)
            <input className={styles.input} type="password" name="password" required minLength={8} />
          </label>
          {error ? <p className={styles.error}>{error}</p> : null}
          <button className={styles.btn} type="submit" disabled={loading}>
            {loading ? "Criando…" : "Começar teste gratuito"}
          </button>
          <p className={styles.muted}>
            Já tem conta? <Link href="/login">Entrar</Link>
          </p>
        </form>
      </div>
    </main>
  );
}
