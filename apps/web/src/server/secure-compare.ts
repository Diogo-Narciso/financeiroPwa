import { timingSafeEqual } from "node:crypto";

/** Constant-time string compare for secrets (UTF-8). Length mismatch → false. */
export function timingSafeEqualString(a: string, b: string): boolean {
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}
