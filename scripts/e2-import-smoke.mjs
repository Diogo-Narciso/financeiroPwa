#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";

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
    email: `e2smoke+${stamp}@example.com`,
    password: "senha-segura-1",
    displayName: "E2 Smoke",
    orgName: `Org E2 ${stamp}`,
    orgKind: "accounting_firm",
  }),
});
assert(signup.status === 200, JSON.stringify(signup));

const company = await api("/api/companies", {
  method: "POST",
  body: JSON.stringify({
    cnpj: "11222333000181",
    legalName: "Empresa Destino Demo",
    uf: "RJ",
  }),
});
assert(company.status === 201, JSON.stringify(company));
const companyId = company.data.id;

const xml = readFileSync("scripts/fixtures/nfe/nfe-entrada-demo.xml");
const sha = createHash("sha256").update(xml).digest("hex");

const fd = new FormData();
fd.set("companyId", companyId);
fd.set("file", new Blob([xml], { type: "application/xml" }), "nfe-entrada-demo.xml");
const imp = await api("/api/imports/entries", { method: "POST", body: fd });
assert(imp.status === 201, `import failed ${JSON.stringify(imp)}`);
assert(imp.data.results?.[0]?.status === "parsed", JSON.stringify(imp.data));
assert(imp.data.results[0].created === true, "should consume quota");

// reimport same bytes
const fd2 = new FormData();
fd2.set("companyId", companyId);
fd2.set("file", new Blob([xml], { type: "application/xml" }), "nfe-entrada-demo.xml");
const dup = await api("/api/imports/entries", { method: "POST", body: fd2 });
assert(dup.status === 201, JSON.stringify(dup));
assert(dup.data.results?.[0]?.status === "duplicate", JSON.stringify(dup.data));

// variant same key
const variant = readFileSync("scripts/fixtures/nfe/nfe-entrada-variante.xml");
const fd3 = new FormData();
fd3.set("companyId", companyId);
fd3.set("file", new Blob([variant], { type: "application/xml" }), "nfe-entrada-variante.xml");
const varRes = await api("/api/imports/entries", { method: "POST", body: fd3 });
assert(varRes.status === 201, JSON.stringify(varRes));
assert(varRes.data.results?.[0]?.status === "variant_quarantine", JSON.stringify(varRes.data));

const list = await api(`/api/invoices?companyId=${companyId}`);
assert(list.status === 200 && list.data.invoices?.length >= 1, JSON.stringify(list));
assert(list.data.invoices[0].sha256 === sha, "sha mismatch");

console.log("E2 import smoke OK", { sha, batchId: imp.data.batchId });
