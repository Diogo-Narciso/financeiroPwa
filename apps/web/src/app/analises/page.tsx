"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PURPOSES } from "@portal-difal/classifier";
import styles from "../ui.module.css";

type Company = { id: string; cnpj: string; legal_name: string };
type ItemRow = {
  item_id: string;
  item_number: number;
  description: string | null;
  ncm: string | null;
  cfop_issuer: string | null;
  access_key: string;
  emit_name: string | null;
  suggested_purpose: string | null;
  confidence: string | null;
  reasons: string[] | null;
  decided_purpose: string | null;
  decision_source: string | null;
  retention_status: string | null;
  retention_warning: string | null;
  manual_action: string | null;
  manual_disclaimer: string | null;
};

const PURPOSE_LABELS: Record<string, string> = {
  revenda: "Revenda",
  industrializacao_insumo: "Insumo / industrialização",
  embalagem: "Embalagem",
  uso_consumo: "Uso e consumo",
  ativo_imobilizado: "Ativo imobilizado",
  outras_operacoes: "Outras",
  indeterminado: "Indeterminado",
};

export default function AnalisesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [companyId, setCompanyId] = useState("");
  const [items, setItems] = useState<ItemRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  async function load(cid: string) {
    const res = await fetch(`/api/analysis/${cid}`);
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Erro ao carregar.");
      return;
    }
    setItems(data.items ?? []);
  }

  useEffect(() => {
    fetch("/api/companies")
      .then((r) => r.json())
      .then(async (data) => {
        const list = (data.companies ?? []) as Company[];
        setCompanies(list);
        if (list[0]) {
          setCompanyId(list[0].id);
          await load(list[0].id);
        }
      })
      .catch(() => setError("Faça login."));
  }, []);

  async function reprocess() {
    setError(null);
    setMsg(null);
    const res = await fetch(`/api/analysis/${companyId}`, { method: "POST" });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Falha ao reprocessar.");
      return;
    }
    setItems(data.items ?? []);
    setMsg(`Análise gerada para ${data.analyzed} item(ns). Sugestões preservadas em overrides.`);
  }

  async function accept(item: ItemRow) {
    if (!item.suggested_purpose) return;
    setError(null);
    const res = await fetch(`/api/items/${item.item_id}/classification/review`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        purpose: item.suggested_purpose,
        acceptSuggestion: true,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Falha.");
      return;
    }
    await load(companyId);
  }

  async function override(item: ItemRow, purpose: string, reason: string) {
    setError(null);
    const res = await fetch(`/api/items/${item.item_id}/classification/review`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ purpose, acceptSuggestion: false, reason }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Falha.");
      return;
    }
    await load(companyId);
  }

  async function manual(item: ItemRow, action: string, reason: string) {
    setError(null);
    const res = await fetch(`/api/items/${item.item_id}/manual-tax-decision`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, reason }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Falha.");
      return;
    }
    setMsg(data.decision?.disclaimer ?? "Decisão manual registrada.");
    await load(companyId);
  }

  return (
    <main className={styles.page}>
      <div className={styles.stack}>
        <div>
          <p className={styles.muted}>
            <Link href="/painel">← Painel</Link>
          </p>
          <h1 className={styles.h1}>Análises e revisão</h1>
          <p className={styles.muted}>
            Sugestão de finalidade com confiança/motivos. Override preserva a
            análise automática. ST/retenção = flags (sem valores de DIFAL
            inventados).
          </p>
        </div>

        <div className={`${styles.card} ${styles.stack}`}>
          <label className={styles.label}>
            Empresa
            <select
              className={styles.select}
              value={companyId}
              onChange={async (e) => {
                setCompanyId(e.target.value);
                await load(e.target.value);
              }}
            >
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.legal_name}
                </option>
              ))}
            </select>
          </label>
          <button className={styles.btn} type="button" onClick={reprocess} disabled={!companyId}>
            Gerar / atualizar sugestões
          </button>
          {error ? <p className={styles.error}>{error}</p> : null}
          {msg ? <p className={styles.ok}>{msg}</p> : null}
        </div>

        {items.map((item) => (
          <article key={item.item_id} className={`${styles.card} ${styles.stack}`}>
            <div>
              <strong>
                Item {item.item_number} — {item.description ?? "(sem descrição)"}
              </strong>
              <p className={styles.muted}>
                NF {item.access_key.slice(25, 34)} · NCM {item.ncm ?? "—"} · CFOP{" "}
                {item.cfop_issuer ?? "—"} · {item.emit_name}
              </p>
            </div>
            <div className={styles.row}>
              <div>
                <div className={styles.muted}>Sugestão</div>
                <div>
                  {item.suggested_purpose
                    ? PURPOSE_LABELS[item.suggested_purpose]
                    : "—"}{" "}
                  {item.confidence ? (
                    <span className={styles.chip}>{item.confidence}</span>
                  ) : null}
                </div>
              </div>
              <div>
                <div className={styles.muted}>Decisão</div>
                <div>
                  {item.decided_purpose
                    ? `${PURPOSE_LABELS[item.decided_purpose]} (${item.decision_source})`
                    : "pendente"}
                </div>
              </div>
              <div>
                <div className={styles.muted}>ST / retenção</div>
                <div>{item.retention_status ?? "—"}</div>
              </div>
            </div>
            {item.reasons?.length ? (
              <ul className={styles.muted} style={{ margin: 0, paddingLeft: "1.1rem" }}>
                {item.reasons.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            ) : null}
            {item.retention_warning ? (
              <p className={styles.error} style={{ whiteSpace: "pre-wrap" }}>
                {item.retention_warning}
              </p>
            ) : null}
            {item.manual_action ? (
              <p className={styles.ok}>
                Manual: {item.manual_action}. {item.manual_disclaimer}
              </p>
            ) : null}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              <button
                className={styles.btn}
                type="button"
                disabled={!item.suggested_purpose}
                onClick={() => accept(item)}
              >
                Aceitar sugestão
              </button>
              <button
                className={`${styles.btn} ${styles.btnSecondary}`}
                type="button"
                onClick={() => {
                  const purpose = window.prompt(
                    `Nova finalidade (${PURPOSES.join(", ")})`,
                    "uso_consumo",
                  );
                  const reason = window.prompt("Motivo do override (obrigatório)");
                  if (!purpose || !reason) return;
                  void override(item, purpose, reason);
                }}
              >
                Override com motivo
              </button>
              <button
                className={`${styles.btn} ${styles.btnSecondary}`}
                type="button"
                onClick={() => {
                  const reason = window.prompt(
                    "Motivo para EXCLUIR DIFAL manualmente (obrigatório)",
                  );
                  if (!reason) return;
                  void manual(item, "exclude_difal", reason);
                }}
              >
                Excluir DIFAL (manual)
              </button>
              <button
                className={`${styles.btn} ${styles.btnSecondary}`}
                type="button"
                onClick={() => {
                  const reason = window.prompt(
                    "Motivo para INCLUIR DIFAL manualmente (obrigatório)",
                  );
                  if (!reason) return;
                  void manual(item, "include_difal", reason);
                }}
              >
                Incluir DIFAL (manual)
              </button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
