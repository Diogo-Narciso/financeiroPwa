/**
 * CNPJ as 14-char text. Numeric DV check when all digits.
 * Alphanumeric format (Receita 2026) accepted by charset/length only — no invented DV.
 */

const CNPJ_CHAR = /^[0-9A-Z]{14}$/;

export function normalizeCnpj(raw: string): string {
  return raw
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/[^0-9A-Z]/g, "");
}

function numericCheckDigits(base12: string): string {
  const calc = (slice: string, weights: number[]) => {
    let sum = 0;
    for (let i = 0; i < weights.length; i++) {
      sum += Number(slice[i]) * (weights[i] ?? 0);
    }
    const mod = sum % 11;
    return String(mod < 2 ? 0 : 11 - mod);
  };
  const d1 = calc(base12, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const d2 = calc(base12 + d1, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  return d1 + d2;
}

export type CnpjValidation =
  | { ok: true; cnpj: string }
  | { ok: false; error: string };

export function validateCnpj(raw: string): CnpjValidation {
  const cnpj = normalizeCnpj(raw);
  if (cnpj.length !== 14) {
    return { ok: false, error: "CNPJ deve ter 14 caracteres (zeros à esquerda preservados)." };
  }
  if (!CNPJ_CHAR.test(cnpj)) {
    return { ok: false, error: "CNPJ inválido: use apenas letras e números." };
  }
  if (/^\d{14}$/.test(cnpj)) {
    if (/^(\d)\1{13}$/.test(cnpj)) {
      return { ok: false, error: "CNPJ numérico inválido." };
    }
    const expected = numericCheckDigits(cnpj.slice(0, 12));
    if (cnpj.slice(12) !== expected) {
      return { ok: false, error: "CNPJ numérico com dígitos verificadores inválidos." };
    }
  }
  // Alphanumeric: length/charset only until official DV lib is wired.
  return { ok: true, cnpj };
}
