import { Decimal, d, roundMoney } from "./decimal";

export type IllustrativeInputs = {
  operationValue: string;
  originAmount: string;
  grossUpRateFraction: string;
  destinationIcmsFraction: string;
  fecpFraction: string;
};

export type IllustrativeResult = {
  legalStatus: "not_homologated_arithmetic_only";
  base: string;
  icmsDifferentialUnrounded: string;
  fecpUnrounded: string;
  sumUnrounded: string;
  icmsDifferentialRounded: string;
  fecpRounded: string;
  sumOfRoundedComponents: string;
  roundedUnroundedSum: string;
  steps: { label: string; expression: string; value: string }[];
};

/**
 * Illustrative gross-up DIFAL formula from CASOS_ARITMETICOS_DEMONSTRACAO.
 * NOT a homologated legal rule — do not use as production tax.
 */
export function computeIllustrativeGrossUpDifal(
  input: IllustrativeInputs,
): IllustrativeResult {
  const operationValue = d(input.operationValue);
  const originAmount = d(input.originAmount);
  const grossUp = d(input.grossUpRateFraction);
  const dest = d(input.destinationIcmsFraction);
  const fecpRate = d(input.fecpFraction);

  const divisor = d(1).minus(grossUp);
  if (divisor.lte(0)) {
    throw new Error("Divisor inválido na fórmula ilustrativa.");
  }

  const base = operationValue.minus(originAmount).div(divisor);
  const icmsDifferential = base.mul(dest).minus(originAmount);
  const fecp = base.mul(fecpRate);
  const sum = icmsDifferential.plus(fecp);

  const icmsR = roundMoney(icmsDifferential);
  const fecpR = roundMoney(fecp);
  const sumComponents = icmsR.plus(fecpR);
  const sumRounded = roundMoney(sum);

  const steps = [
    {
      label: "base",
      expression: "(operation_value - origin_amount) / (1 - gross_up_rate_fraction)",
      value: base.toFixed(),
    },
    {
      label: "icms_differential",
      expression: "base * destination_icms_fraction - origin_amount",
      value: icmsDifferential.toFixed(),
    },
    {
      label: "fecp",
      expression: "base * fecp_fraction",
      value: fecp.toFixed(),
    },
    {
      label: "sum_of_rounded_components",
      expression: "round(icms) + round(fecp)",
      value: sumComponents.toFixed(2),
    },
    {
      label: "rounded_unrounded_sum",
      expression: "round(icms_unrounded + fecp_unrounded)",
      value: sumRounded.toFixed(2),
    },
  ];

  return {
    legalStatus: "not_homologated_arithmetic_only",
    base: base.toFixed(),
    icmsDifferentialUnrounded: icmsDifferential.toFixed(),
    fecpUnrounded: fecp.toFixed(),
    sumUnrounded: sum.toFixed(),
    icmsDifferentialRounded: icmsR.toFixed(2),
    fecpRounded: fecpR.toFixed(2),
    sumOfRoundedComponents: sumComponents.toFixed(2),
    roundedUnroundedSum: sumRounded.toFixed(2),
    steps,
  };
}

export const DEMO_CASES = {
  "ARIT-A": {
    operationValue: "1000.00",
    originAmount: "120.00",
    grossUpRateFraction: "0.22",
    destinationIcmsFraction: "0.20",
    fecpFraction: "0.02",
    expected: {
      icms: "105.64",
      fecp: "22.56",
      sumComponents: "128.20",
      sumTotal: "128.21",
    },
  },
  "ARIT-B": {
    operationValue: "1000.00",
    originAmount: "88.00",
    grossUpRateFraction: "0.088",
    destinationIcmsFraction: "0.088",
    fecpFraction: "0.00",
    expected: {
      icms: "0.00",
      fecp: "0.00",
      sumComponents: "0.00",
      sumTotal: "0.00",
    },
  },
  "ARIT-C": {
    operationValue: "1000.00",
    originAmount: "40.00",
    grossUpRateFraction: "0.088",
    destinationIcmsFraction: "0.088",
    fecpFraction: "0.00",
    expected: {
      icms: "52.63",
      fecp: "0.00",
      sumComponents: "52.63",
      sumTotal: "52.63",
    },
  },
} as const;

export function assertDemoCase(id: keyof typeof DEMO_CASES): IllustrativeResult {
  const c = DEMO_CASES[id];
  const result = computeIllustrativeGrossUpDifal(c);
  if (result.icmsDifferentialRounded !== c.expected.icms) {
    throw new Error(`${id}: icms expected ${c.expected.icms} got ${result.icmsDifferentialRounded}`);
  }
  if (result.fecpRounded !== c.expected.fecp) {
    throw new Error(`${id}: fecp expected ${c.expected.fecp} got ${result.fecpRounded}`);
  }
  if (result.sumOfRoundedComponents !== c.expected.sumComponents) {
    throw new Error(`${id}: sum components expected ${c.expected.sumComponents}`);
  }
  if (result.roundedUnroundedSum !== c.expected.sumTotal) {
    throw new Error(`${id}: rounded sum expected ${c.expected.sumTotal}`);
  }
  return result;
}
