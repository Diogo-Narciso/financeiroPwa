#!/usr/bin/env node
/** E7 smoke: readiness board, P01–P14 present, launch not auto-approved, security headers. */

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
  return {
    status: res.status,
    headers: res.headers,
    data: await res.json().catch(() => ({})),
  };
}

function assert(c, m) {
  if (!c) throw new Error(m);
}

const stamp = Date.now();
const signup = await api("/api/auth/signup", {
  method: "POST",
  body: JSON.stringify({
    email: `e7smoke+${stamp}@example.com`,
    password: "senha-segura-1",
    displayName: "E7",
    orgName: `Org E7 ${stamp}`,
    orgKind: "accounting_firm",
  }),
});
assert(signup.status === 200, JSON.stringify(signup));

const status = await api("/api/homologation/status");
assert(status.status === 200, JSON.stringify(status));
assert(status.data.frank.flags.launchApproved === false, "must not auto-approve launch");
assert(status.data.activationPendencies?.length === 14, "P01–P14 expected");
assert(status.data.checklist?.length === 15, "L01–L15 expected");
assert(status.data.frank.flags.hasHomologatedRule === false, "no homologated tax rules yet");
assert(status.data.frank.flags.erpHomologated === false, "ERP not certified");
assert(status.data.frank.flags.paidPublishable === false, "paid offers not publishable");
assert(status.data.frank.flags.liveBillingEnabled === false, "no live billing");

const home = await fetch(`${BASE}/`);
assert(home.headers.get("x-content-type-options") === "nosniff", "missing nosniff");
assert(home.headers.get("x-frame-options") === "DENY", "missing frame deny");

const bad = await api("/api/homologation/checklist", {
  method: "PATCH",
  body: JSON.stringify({ code: "L03", status: "done", evidence: "" }),
});
assert(bad.status === 400 && bad.data.code === "EVIDENCE_REQUIRED", "evidence required");

const snap = await api("/api/homologation/status", {
  method: "POST",
  body: JSON.stringify({ action: "snapshot" }),
});
assert(snap.status === 200 && snap.data.snapshot.launch_approved === false, JSON.stringify(snap));

console.log("E7 homologation smoke OK", {
  openPendencies: status.data.frank.flags.openPendencies,
  checklist: status.data.frank.flags.checklistProgress,
  snapshotId: snap.data.snapshot.id,
});
