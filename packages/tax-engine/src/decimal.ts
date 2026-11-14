import Decimal from "decimal.js";

/** Fiscal arithmetic uses Decimal — never binary float as source of truth. */
Decimal.set({ precision: 40, rounding: Decimal.ROUND_HALF_UP });

export { Decimal };

export function d(value: string | number | Decimal): Decimal {
  return new Decimal(value);
}

export function roundMoney(value: Decimal): Decimal {
  return value.toDecimalPlaces(2, Decimal.ROUND_HALF_UP);
}
