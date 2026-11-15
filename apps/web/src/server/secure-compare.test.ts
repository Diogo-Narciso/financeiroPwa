import assert from "node:assert/strict";
import { timingSafeEqualString } from "./secure-compare";

assert.equal(timingSafeEqualString("abc", "abc"), true);
assert.equal(timingSafeEqualString("abc", "abd"), false);
assert.equal(timingSafeEqualString("abc", "ab"), false);
assert.equal(timingSafeEqualString("", ""), true);
console.log("OK secure-compare timingSafeEqualString");
