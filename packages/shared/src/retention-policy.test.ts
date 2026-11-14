import assert from "node:assert/strict";
import { RETENTION_POLICY } from "./retention-policy";

assert.equal(RETENTION_POLICY.legalReviewRequired, true);
assert.equal(RETENTION_POLICY.classes.nfeXmlOriginal.silentDeleteForbidden, true);
assert.equal(RETENTION_POLICY.classes.nfeXmlOriginal.immutableStorage, true);
assert.ok(RETENTION_POLICY.classes.auditEvents.hotRetentionDays >= 365);
assert.ok(RETENTION_POLICY.classes.authAccount.afterDeletionRequestDays >= 1);
assert.equal(RETENTION_POLICY.classes.appLogs.avoidUnnecessaryPii, true);
// Must not encode tax rates / fiscal law
assert.equal("aliquota" in RETENTION_POLICY, false);

console.log("OK H11 retention-policy draft constants");
