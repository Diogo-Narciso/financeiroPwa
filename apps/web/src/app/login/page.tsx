"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { APP_NAME } from "@portal-difal/shared";
import styles from "../ui.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: fd.get("email"),
        password: fd.get("password"),
      }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error ?? "Falha no login.");
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
            <Link href="/">{APP_NAME}</Link>
          </p>
          <h1 className={styles.h1}>Entrar</h1>
        </div>
        <form className={`${styles.card} ${styles.stack}`} onSubmit={onSubmit}>
          <label className={styles.label}>
            E-mail
            <input className={styles.input} type="email" name="email" required />
          </label>
          <label className={styles.label}>
            Senha
            <input className={styles.input} type="password" name="password" required />
          </label>
          {error ? <p className={styles.error}>{error}</p> : null}
          <button className={styles.btn} type="submit" disabled={loading}>
            {loading ? "Entrando…" : "Entrar"}
          </button>
          <p className={styles.muted}>
            Novo por aqui? <Link href="/cadastro">Criar conta</Link>
          </p>
        </form>
      </div>
    </main>
  );
}
