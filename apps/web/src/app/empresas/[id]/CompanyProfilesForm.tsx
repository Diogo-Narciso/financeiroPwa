"use client";

import { useState } from "react";
import {
  ACTIVITY_QUESTIONS,
  ACTIVITY_SECTORS,
  ICMS_TAXPAYER_OPTIONS,
  TAX_REGIMES,
} from "@portal-difal/shared";
import styles from "../../ui.module.css";

const SECTOR_LABELS: Record<string, string> = {
  comercio_varejista: "Comércio varejista",
  atacado: "Atacado",
  industria: "Indústria",
  alimentos: "Alimentos",
  servicos: "Serviços",
  transportes: "Transportes",
  saude: "Saúde",
  construcao: "Construção",
  agronegocio: "Agronegócio",
  comercio_eletronico: "Comércio eletrônico",
  outro: "Outro",
};

const REGIME_LABELS: Record<string, string> = {
  simples_nacional: "Simples Nacional",
  regime_normal: "Regime normal",
  outro: "Outro",
  nao_sei: "Não sei / solicitar revisão",
};

const ICMS_LABELS: Record<string, string> = {
  contribuinte: "Contribuinte de ICMS",
  nao_contribuinte: "Não contribuinte",
  nao_sei: "Não sei",
};

export function CompanyProfilesForm({ companyId }: { companyId: string }) {
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [sectors, setSectors] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  async function saveTax(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setMsg(null);
    const fd = new FormData(e.currentTarget);
    const res = await fetch(`/api/companies/${companyId}/tax-profile`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        regime: fd.get("regime"),
        icmsTaxpayer: fd.get("icmsTaxpayer"),
        mainCnae: fd.get("mainCnae"),
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setErr(data.error ?? "Erro ao salvar perfil tributário.");
      return;
    }
    setMsg("Perfil tributário salvo (versão por competência). Sem alíquotas inventadas.");
  }

  async function saveActivity(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setMsg(null);
    const res = await fetch(`/api/companies/${companyId}/activity-profile`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sectors, answers }),
    });
    const data = await res.json();
    if (!res.ok) {
      setErr(data.error ?? "Erro ao salvar questionário.");
      return;
    }
    setMsg("Questionário operacional salvo. CNAE não impõe finalidade automática.");
  }

  return (
    <div className={styles.stack}>
      {err ? <p className={styles.error}>{err}</p> : null}
      {msg ? <p className={styles.ok}>{msg}</p> : null}

      <form className={`${styles.card} ${styles.stack}`} onSubmit={saveTax}>
        <h2 style={{ margin: 0, fontSize: "1.05rem" }}>Perfil tributário</h2>
        <p className={styles.muted}>
          Declarativo do usuário. Não há tabela de alíquotas nesta etapa.
        </p>
        <label className={styles.label}>
          Regime
          <select className={styles.select} name="regime" required defaultValue="simples_nacional">
            {TAX_REGIMES.map((r) => (
              <option key={r} value={r}>
                {REGIME_LABELS[r]}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.label}>
          Contribuinte de ICMS
          <select className={styles.select} name="icmsTaxpayer" required defaultValue="contribuinte">
            {ICMS_TAXPAYER_OPTIONS.map((r) => (
              <option key={r} value={r}>
                {ICMS_LABELS[r]}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.label}>
          CNAE principal (opcional)
          <input className={styles.input} name="mainCnae" placeholder="0000-0/00" />
        </label>
        <button className={styles.btn} type="submit">
          Salvar perfil tributário
        </button>
      </form>

      <form className={`${styles.card} ${styles.stack}`} onSubmit={saveActivity}>
        <h2 style={{ margin: 0, fontSize: "1.05rem" }}>Questionário operacional</h2>
        <p className={styles.muted}>Setores e atividades — opção &quot;Não sei&quot; permitida.</p>
        <div className={styles.sectorGrid}>
          {ACTIVITY_SECTORS.map((s) => (
            <label key={s} className={styles.sectorItem}>
              <input
                type="checkbox"
                checked={sectors.includes(s)}
                onChange={(e) => {
                  setSectors((prev) =>
                    e.target.checked ? [...prev, s] : prev.filter((x) => x !== s),
                  );
                }}
              />{" "}
              {SECTOR_LABELS[s] ?? s}
            </label>
          ))}
        </div>
        <div className={styles.stack}>
          {ACTIVITY_QUESTIONS.map((q) => (
            <div key={q.id} className={styles.qItem}>
              <strong>{q.label}</strong>
              <select
                className={styles.select}
                value={answers[q.id] ?? ""}
                onChange={(e) =>
                  setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                }
                required
              >
                <option value="" disabled>
                  Selecione
                </option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
                <option value="nao_sei">Não sei / solicitar revisão</option>
              </select>
            </div>
          ))}
        </div>
        <button className={styles.btn} type="submit">
          Salvar questionário
        </button>
      </form>
    </div>
  );
}
