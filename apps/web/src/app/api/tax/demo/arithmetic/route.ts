import { DEMO_CASES, assertDemoCase } from "@portal-difal/tax-engine";
import { jsonOk } from "@/server/http";

export const runtime = "nodejs";

/** Public demo endpoint for arithmetic fixtures — explicitly not fiscal law. */
export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get("case") ?? "ARIT-A";
  if (!(id in DEMO_CASES)) {
    return jsonOk({ error: "Caso desconhecido." }, 400);
  }
  const result = assertDemoCase(id as keyof typeof DEMO_CASES);
  return jsonOk({
    warning:
      "Demonstração aritmética apenas. Não é regra fiscal homologada e não ativa produção.",
    caseId: id,
    legalStatus: result.legalStatus,
    result,
  });
}
