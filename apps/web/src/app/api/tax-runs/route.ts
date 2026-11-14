import { DEMO_CASES } from "@portal-difal/tax-engine";
import { jsonError, jsonOk } from "@/server/http";
import { requireUser } from "@/server/session";
import { canAccessTaxRun } from "@/server/tax-run-role-gate";
import { TaxRunError, createTaxRun } from "@/server/tax-runs";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const user = await requireUser();
    if (!canAccessTaxRun(user.role)) {
      return jsonOk({ error: "Sem permissão." }, 403);
    }
    const body = (await request.json()) as {
      companyId?: string;
      mode?: "production_pending" | "demo_arithmetic";
      demoCaseId?: string;
    };
    if (!body.companyId) return jsonOk({ error: "companyId obrigatório." }, 400);
    const mode = body.mode ?? "production_pending";
    if (mode === "demo_arithmetic" && body.demoCaseId && !(body.demoCaseId in DEMO_CASES)) {
      return jsonOk({ error: "demoCaseId inválido." }, 400);
    }
    const result = await createTaxRun({
      tenantId: user.tenantId,
      companyId: body.companyId,
      actorUserId: user.id,
      mode,
      demoCaseId: body.demoCaseId as keyof typeof DEMO_CASES | undefined,
    });
    return jsonOk(result, 201);
  } catch (error) {
    if (error instanceof TaxRunError) {
      return jsonOk({ error: error.message, code: error.code }, error.status);
    }
    return jsonError(error);
  }
}
