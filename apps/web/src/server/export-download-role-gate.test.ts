import assert from "node:assert/strict";
import {
  EXPORT_DOWNLOAD_ROLES,
  canAccessExportDownload,
} from "./export-download-role-gate";

assert.deepEqual([...EXPORT_DOWNLOAD_ROLES], [
  "owner",
  "admin",
  "reviewer",
  "analyst",
]);

for (const role of EXPORT_DOWNLOAD_ROLES) {
  assert.equal(canAccessExportDownload(role), true, role);
}

assert.equal(canAccessExportDownload("viewer"), false);
assert.equal(canAccessExportDownload("guest"), false);
assert.equal(canAccessExportDownload(""), false);
assert.equal(canAccessExportDownload("OWNER"), false);

console.log("OK H54 export download role gate 403 unit");
