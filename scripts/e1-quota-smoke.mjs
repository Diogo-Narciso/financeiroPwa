#!/usr/bin/env node
/**
 * Smoke: signup → 3 companies OK → 4th blocked → 5 entry reserves OK → 6th blocked.
 * Requires: pnpm db:migrate && pnpm dev (BASE_URL default http://127.0.0.1:3000)
 */
const BASE = process.env.BASE_URL ?? "http://127.0.0.1:3000";

function validCnpj(base12) {
  const calc = (slice, weights) => {
    let sum = 0;
    for (let i = 0; i < weights.length; i++) sum += Number(slice[i]) * weights[i];
    const mod = sum % 11;
    return String(mod < 2 ? 0 : 11 - mod);
  };
  const d1 = calc(base12, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const d2 = calc(base12 + d1, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  return base12 + d1 + d2;
}

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
  const set = res.headers.getSetCookie?.() ?? [];
  for (const c of set) {
    const part = c.split(";")[0];
    if (part.startsWith("portal_difal_session=")) jar.cookie = part;
  }
  // Node < fetch getSetCookie fallback
  const raw = res.headers.get("set-cookie");
  if (raw && raw.includes("portal_difal_session=")) {
    jar.cookie = raw.split(";")[0];
  }
  const data = await res.json().catch(() => ({}));
  return { status: res.status, data };
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

const stamp = Date.now();
const email = `e1smoke+${stamp}@example.com`;

const signup = await api("/api/auth/signup", {
  method: "POST",
  body: JSON.stringify({
    email,
    password: "senha-segura-1",
    displayName: "Smoke E1",
    orgName: `Org Smoke ${stamp}`,
    orgKind: "accounting_firm",
  }),
});
assert(signup.status === 200, `signup failed: ${JSON.stringify(signup)}`);
assert(jar.cookie, "session cookie missing");

const cnpjs = [
  validCnpj("112223330001"),
  validCnpj("112223330002"),
  validCnpj("112223330003"),
  validCnpj("112223330004"),
];
// Fix: inventing check digits by appending may not match validCnpj algorithm for arbitrary bases.
// Use known valid CNPJs instead.
const known = ["11222333000181", "22333444000181", "33444555000181", "44555666000181"];

const companyIds = [];
for (let i = 0; i < 3; i++) {
  const r = await api("/api/companies", {
    method: "POST",
    body: JSON.stringify({
      cnpj: known[i],
      legalName: `Empresa ${i + 1}`,
      uf: "RJ",
    }),
  });
  assert(r.status === 201, `company ${i + 1} should create: ${JSON.stringify(r)}`);
  companyIds.push(r.data.id);
}

const fourth = await api("/api/companies", {
  method: "POST",
  body: JSON.stringify({ cnpj: known[3], legalName: "Empresa 4", uf: "RJ" }),
});
assert(fourth.status === 409, `4th company should block: ${JSON.stringify(fourth)}`);
assert(fourth.data.code === "TRIAL_COMPANY_LIMIT", "expected TRIAL_COMPANY_LIMIT");

const companyId = companyIds[0];
for (let i = 1; i <= 5; i++) {
  const key = `SMOKE${stamp}${String(i).padStart(2, "0")}`.padEnd(44, "0");
  const r = await api("/api/quotas/entry-invoices/reserve", {
    method: "POST",
    body: JSON.stringify({ companyId, accessKey: key }),
  });
  assert(r.status === 201 || r.status === 200, `reserve ${i}: ${JSON.stringify(r)}`);
}
const sixth = await api("/api/quotas/entry-invoices/reserve", {
  method: "POST",
  body: JSON.stringify({
    companyId,
    accessKey: `SMOKE${stamp}06`.padEnd(44, "0"),
  }),
});
assert(sixth.status === 409, `6th reserve should block: ${JSON.stringify(sixth)}`);
assert(sixth.data.code === "TRIAL_ENTRY_INVOICE_LIMIT", "expected TRIAL_ENTRY_INVOICE_LIMIT");

// reimport same key does not consume new slot
const same = await api("/api/quotas/entry-invoices/reserve", {
  method: "POST",
  body: JSON.stringify({
    companyId,
    accessKey: `SMOKE${stamp}01`.padEnd(44, "0"),
  }),
});
assert(same.status === 200 && same.data.created === false, "same key should return existing");

console.log("E1 quota smoke OK");
