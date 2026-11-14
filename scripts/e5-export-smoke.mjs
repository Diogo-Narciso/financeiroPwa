#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import JSZip from "jszip";

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
  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/zip") || ct.includes("octet-stream")) {
    return { status: res.status, bytes: Buffer.from(await res.arrayBuffer()) };
  }
  return { status: res.status, data: await res.json().catch(() => ({})) };
}
function assert(c, m) { if (!c) throw new Error(m); }

const stamp = Date.now();
const signup = await api("/api/auth/signup", {
  method: "POST",
  body: JSON.stringify({
    email: `e5smoke+${stamp}@example.com`,
    password: "senha-segura-1",
    displayName: "E5",
    orgName: `Org E5 ${stamp}`,
    orgKind: "accounting_firm",
  }),
});
assert(signup.status === 200, JSON.stringify(signup));
const company = await api("/api/companies", {
  method: "POST",
  body: JSON.stringify({ cnpj: "11222333000181", legalName: "E5 Co", uf: "RJ" }),
});
assert(company.status === 201, JSON.stringify(company));
const companyId = company.data.id;

const xml = readFileSync("scripts/fixtures/nfe/nfe-entrada-demo.xml");
const xmlSha = createHash("sha256").update(xml).digest("hex");
const fd = new FormData();
fd.set("companyId", companyId);
fd.set("file", new Blob([xml], { type: "application/xml" }), "nfe-entrada-demo.xml");
const imp = await api("/api/imports/entries", { method: "POST", body: fd });
assert(imp.status === 201 && imp.data.results?.[0]?.status === "parsed", JSON.stringify(imp));

const analysis = await api(`/api/analysis/${companyId}`, { method: "POST" });
const itemId = analysis.data.items[0].item_id;
await api(`/api/items/${itemId}/classification/review`, {
  method: "POST",
  body: JSON.stringify({ purpose: "uso_consumo", acceptSuggestion: false, reason: "E5 test" }),
});
await api(`/api/items/${itemId}/cfop/approve`, {
  method: "POST",
  body: JSON.stringify({ bookkeepingCfop: "2556", reason: "Uso e consumo — escrituração auxiliar" }),
});

const exp = await api("/api/exports", {
  method: "POST",
  body: JSON.stringify({ companyId }),
});
assert(exp.status === 201, JSON.stringify(exp));
assert(exp.data.manifest.policy.xml_authorized_immutable === true, "policy");
assert(exp.data.manifest.originals[0].sha256 === xmlSha, "manifest sha mismatch");

const dl = await api(exp.data.downloadPath);
assert(dl.status === 200 && dl.bytes?.length > 0, "download failed");
const zip = await JSZip.loadAsync(dl.bytes);
const names = Object.keys(zip.files);
assert(names.some((n) => n.startsWith("originais/") && n.endsWith(".xml")), "missing original");
assert(names.includes("mapeamento_cfop/entrada_itens.csv"), "missing mapping");
assert(names.includes("auditoria/manifesto.json"), "missing manifesto");
const originalEntry = names.find((n) => n.startsWith("originais/") && n.endsWith(".xml"));
const exportedXml = Buffer.from(await zip.file(originalEntry).async("uint8array"));
const exportedSha = createHash("sha256").update(exportedXml).digest("hex");
assert(exportedSha === xmlSha, `F01 fail: exported ${exportedSha} != ${xmlSha}`);
assert(Buffer.compare(exportedXml, xml) === 0, "bytes not identical");

console.log("E5 export smoke OK", { xmlSha, exportJobId: exp.data.exportJobId });
