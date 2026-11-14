#!/usr/bin/env node
import { readFileSync } from "node:fs";

const BASE = process.env.BASE_URL ?? "http://127.0.0.1:3000";
const jar = { cookie: "" };

async function api(path, opts = {}) {
  const res = await fetch(`${BASE}${path}`, {
    ...opts,
    headers: {
      ...(opts.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      ...(jar.cookie ? { Cookie: jar.cookie } : {}),
      ...(opts.headers ?? {}),
    },
  });
  const raw = res.headers.get("set-cookie");
  if (raw && raw.includes("portal_difal_session=")) jar.cookie = raw.split(";")[0];
  const data = await res.json().catch(() => ({}));
  return { status: res.status, data };
}
function assert(c, m) { if (!c) throw new Error(m); }

const stamp = Date.now();
const signup = await api("/api/auth/signup", {
  method: "POST",
  body: JSON.stringify({
    email: `e3smoke+${stamp}@example.com`,
    password: "senha-segura-1",
    displayName: "E3 Smoke",
    orgName: `Org E3 ${stamp}`,
    orgKind: "accounting_firm",
  }),
});
assert(signup.status === 200, JSON.stringify(signup));

const company = await api("/api/companies", {
  method: "POST",
  body: JSON.stringify({ cnpj: "11222333000181", legalName: "Destino E3", uf: "RJ" }),
});
assert(company.status === 201, JSON.stringify(company));
const companyId = company.data.id;

const xml = readFileSync("scripts/fixtures/nfe/nfe-entrada-demo.xml");
const fd = new FormData();
fd.set("companyId", companyId);
fd.set("file", new Blob([xml], { type: "application/xml" }), "nfe-entrada-demo.xml");
const imp = await api("/api/imports/entries", { method: "POST", body: fd });
assert(imp.status === 201 && imp.data.results?.[0]?.status === "parsed", JSON.stringify(imp));

const analysis = await api(`/api/analysis/${companyId}`, { method: "POST" });
assert(analysis.status === 200, JSON.stringify(analysis));
assert(analysis.data.analyzed >= 1, "no items analyzed");
const item = analysis.data.items[0];
assert(item.suggested_purpose, "missing suggestion");
assert(item.confidence, "missing confidence");
assert(Array.isArray(item.reasons) && item.reasons.length > 0, "missing reasons");
assert(item.retention_status, "missing retention");

const accept = await api(`/api/items/${item.item_id}/classification/review`, {
  method: "POST",
  body: JSON.stringify({ purpose: item.suggested_purpose, acceptSuggestion: true }),
});
assert(accept.status === 201, JSON.stringify(accept));

const override = await api(`/api/items/${item.item_id}/classification/review`, {
  method: "POST",
  body: JSON.stringify({
    purpose: "uso_consumo",
    acceptSuggestion: false,
    reason: "Decisão do usuário para teste E3",
  }),
});
assert(override.status === 201, JSON.stringify(override));

// suggestion must still exist
const after = await api(`/api/analysis/${companyId}`);
const row = after.data.items.find((i) => i.item_id === item.item_id);
assert(row.suggested_purpose, "suggestion erased");
assert(row.decided_purpose === "uso_consumo", "override not saved");
assert(row.decision_source === "user_override", "source wrong");

const noReason = await api(`/api/items/${item.item_id}/manual-tax-decision`, {
  method: "POST",
  body: JSON.stringify({ action: "exclude_difal", reason: "" }),
});
assert(noReason.status === 400, "should require reason");

const manual = await api(`/api/items/${item.item_id}/manual-tax-decision`, {
  method: "POST",
  body: JSON.stringify({
    action: "exclude_difal",
    reason: "Cliente optou por não recolher nesta competência (teste).",
  }),
});
assert(manual.status === 201, JSON.stringify(manual));
assert(String(manual.data.decision.disclaimer).includes("MANUAL"), "disclaimer missing");

const final = await api(`/api/analysis/${companyId}`);
const finalRow = final.data.items.find((i) => i.item_id === item.item_id);
assert(finalRow.manual_action === "exclude_difal", "manual missing");
assert(finalRow.suggested_purpose, "automatic analysis must remain");
assert(finalRow.suggestion_snapshot || finalRow.manual_disclaimer, "snapshot/disclaimer");

console.log("E3 analysis smoke OK", {
  suggested: row.suggested_purpose,
  decided: row.decided_purpose,
  retention: row.retention_status,
});
