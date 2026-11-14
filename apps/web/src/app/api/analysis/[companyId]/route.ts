import { analyzeCompanyItems, listAnalysis, AnalysisError } from "@/server/analysis";
import { jsonError, jsonOk } from "@/server/http";
import { requireUser } from "@/server/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Params = { params: Promise<{ companyId: string }> };

export async function GET(_request: Request, { params }: Params) {
  try {
    const user = await requireUser();
    const { companyId } = await params;
    const items = await listAnalysis({ tenantId: user.tenantId, companyId });
    return jsonOk({ items });
  } catch (error) {
    return jsonError(error);
  }
}

export async function POST(_request: Request, { params }: Params) {
  try {
    const user = await requireUser();
    if (!["owner", "admin", "analyst", "reviewer"].includes(user.role)) {
      return jsonOk({ error: "Sem permissão para reprocessar análise." }, 403);
    }
    const { companyId } = await params;
    const result = await analyzeCompanyItems({
      tenantId: user.tenantId,
      companyId,
      actorUserId: user.id,
    });
    const items = await listAnalysis({ tenantId: user.tenantId, companyId });
    return jsonOk({ ...result, items });
  } catch (error) {
    if (error instanceof AnalysisError) {
      return jsonOk({ error: error.message, code: error.code }, error.status);
    }
    return jsonError(error);
  }
}
