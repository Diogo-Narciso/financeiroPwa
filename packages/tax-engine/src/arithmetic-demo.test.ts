import { assertDemoCase, DEMO_CASES } from "./arithmetic-demo";

for (const id of Object.keys(DEMO_CASES) as (keyof typeof DEMO_CASES)[]) {
  const result = assertDemoCase(id);
  console.log(`OK ${id}`, {
    icms: result.icmsDifferentialRounded,
    fecp: result.fecpRounded,
    sumComponents: result.sumOfRoundedComponents,
    sumTotal: result.roundedUnroundedSum,
    legalStatus: result.legalStatus,
  });
}
console.log("All arithmetic demo cases passed (not homologated).");
