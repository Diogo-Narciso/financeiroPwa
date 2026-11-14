import assert from "node:assert/strict";
import {
  TenantIsolationError,
  assertTenantResource,
  filterByTenant,
  sameTenant,
} from "./tenant-guard";

assert.equal(sameTenant("t-a", "t-a"), true);
assert.equal(sameTenant("t-a", "t-b"), false);
assert.equal(sameTenant("t-a", null), false);
assert.equal(sameTenant("", "t-a"), false);

const own = assertTenantResource("t-a", { tenantId: "t-a", id: "1" });
assert.equal(own.id, "1");

assert.throws(
  () => assertTenantResource("t-a", { tenantId: "t-b", id: "x" }),
  (err: unknown) =>
    err instanceof TenantIsolationError && (err as TenantIsolationError).status === 404,
);

assert.throws(
  () => assertTenantResource("t-a", null),
  (err: unknown) => err instanceof TenantIsolationError,
);

const filtered = filterByTenant("t-a", [
  { tenantId: "t-a", id: "1" },
  { tenantId: "t-b", id: "2" },
  { tenantId: "t-a", id: "3" },
]);
assert.deepEqual(
  filtered.map((r) => r.id),
  ["1", "3"],
);

console.log("OK H17 tenant-guard anti-IDOR helpers");
