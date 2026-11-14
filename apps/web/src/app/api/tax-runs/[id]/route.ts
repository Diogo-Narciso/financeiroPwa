import { jsonError, jsonOk } from "@/server/http";
import { requireUser } from "@/server/session";
import { canAccessTaxRun } from "@/server/tax-run-role-gate";
import { TaxRunError, getTaxRun } from "@/server/tax-runs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  try {
    const user = await requireUser();
    // H48 / H53 / E-R02: same roles as POST /api/tax-runs
    if (!canAccessTaxRun(user.role)) {
      return jsonOk({ error: "Sem permissão." }, 403);
    }
    const { id } = await params;
    const data = await getTaxRun({ tenantId: user.tenantId, runId: id });
    return jsonOk(data);
  } catch (error) {
    if (error instanceof TaxRunError) {
      return jsonOk({ error: error.message, code: error.code }, error.status);
    }
    return jsonError(error);
  }
}
