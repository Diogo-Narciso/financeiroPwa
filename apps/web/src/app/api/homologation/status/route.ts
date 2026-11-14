import { HomologationError, buildReadinessBoard, persistReadinessSnapshot } from "@/server/homologation";
import { jsonError, jsonOk } from "@/server/http";
import { requireUser } from "@/server/session";

export const runtime = "nodejs";

export async function GET() {
  try {
    await requireUser();
    const board = await buildReadinessBoard();
    return jsonOk(board);
  } catch (error) {
    return jsonError(error);
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireUser();
    if (!["owner", "admin"].includes(user.role)) {
      return jsonOk({ error: "Sem permissão." }, 403);
    }
    const body = (await request.json().catch(() => ({}))) as { action?: string };
    if (body.action === "snapshot") {
      const result = await persistReadinessSnapshot(user.id, user.tenantId);
      return jsonOk({ ok: true, ...result });
    }
    return jsonOk({ error: "action inválida" }, 400);
  } catch (error) {
    if (error instanceof HomologationError) {
      return jsonOk({ error: error.message, code: error.code }, error.status);
    }
    return jsonError(error);
  }
}
