#!/usr/bin/env node
const BASE = process.env.BASE_URL ?? "http://127.0.0.1:3000";
const jar = { cookie: "" };
async function api(path, opts = {}) {
  const res = await fetch(`${BASE}${path}`, {
    ...opts,
    headers: {
      "Content-Type": "application/json",
      ...(jar.cookie ? { Cookie: jar.cookie } : {}),
      ...(opts.headers ?? {}),
    },
  });
  const raw = res.headers.get("set-cookie");
  if (raw && raw.includes("portal_difal_session=")) jar.cookie = raw.split(";")[0];
  return { status: res.status, data: await res.json().catch(() => ({})) };
}
function assert(c, m) { if (!c) throw new Error(m); }

const demo = await api("/api/tax/demo/arithmetic?case=ARIT-A");
assert(demo.status === 200, JSON.stringify(demo));
assert(demo.data.result.icmsDifferentialRounded === "105.64", "ARIT-A icms");
assert(demo.data.result.sumOfRoundedComponents === "128.20", "ARIT-A sum components");
assert(demo.data.result.roundedUnroundedSum === "128.21", "ARIT-A total round");
assert(demo.data.legalStatus === "not_homologated_arithmetic_only", "legal status");

const c = await api("/api/tax/demo/arithmetic?case=ARIT-C");
assert(c.data.result.icmsDifferentialRounded === "52.63", "ARIT-C");

const stamp = Date.now();
const signup = await api("/api/auth/signup", {
  method: "POST",
  body: JSON.stringify({
    email: `e4smoke+${stamp}@example.com`,
    password: "senha-segura-1",
    displayName: "E4",
    orgName: `Org E4 ${stamp}`,
    orgKind: "company",
  }),
});
assert(signup.status === 200, JSON.stringify(signup));
const company = await api("/api/companies", {
  method: "POST",
  body: JSON.stringify({ cnpj: "11222333000181", legalName: "E4 Co", uf: "RJ" }),
});
assert(company.status === 201, JSON.stringify(company));

const pending = await api("/api/tax-runs", {
  method: "POST",
  body: JSON.stringify({ companyId: company.data.id, mode: "production_pending" }),
});
assert(pending.status === 201, JSON.stringify(pending));
assert(pending.data.hasHomologated === false, "must not be homologated");

const demoRun = await api("/api/tax-runs", {
  method: "POST",
  body: JSON.stringify({ companyId: company.data.id, mode: "demo_arithmetic", demoCaseId: "ARIT-A" }),
});
assert(demoRun.status === 201, JSON.stringify(demoRun));
const demoResult = demoRun.data.results?.[0];
assert(demoResult?.outcome === "demo_arithmetic_only", JSON.stringify(demoResult));
assert(demoResult.icmsDifal === "105.64", "demo icms");
assert(demoResult.fecp === "22.56", "demo fecp");
assert(demoResult.scenarios?.length === 2, "A/B scenarios");

console.log("E4 tax smoke OK");
