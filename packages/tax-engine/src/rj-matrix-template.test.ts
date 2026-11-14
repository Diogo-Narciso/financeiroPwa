import assert from "node:assert/strict";
import {
  RJ_MATRIX_FIELD_KEYS,
  emptyRjMatrixDraft,
  requiredRjFieldsMissing,
} from "./rj-matrix-template";

assert.ok(RJ_MATRIX_FIELD_KEYS.includes("modality"));
assert.ok(RJ_MATRIX_FIELD_KEYS.includes("fecpFraction"));

const draft = emptyRjMatrixDraft();
assert.equal(draft.publicationStatus, "pending_homologation");
assert.equal(draft.fecpFraction, null);
assert.equal(draft.destinationIcmsFraction, null);
assert.equal(draft.approvedAt, null);
assert.ok(requiredRjFieldsMissing(draft).length >= 5);

// Must not ship default numeric rates
assert.equal(draft.fecpFraction, null);
assert.equal(draft.destinationIcmsFraction, null);

console.log("OK H25 rj-matrix-template empty draft");
