import { ORG_KINDS, type OrgKind } from "@portal-difal/shared";
import { signup } from "@/server/auth-service";
import { jsonError, jsonOk } from "@/server/http";
import { setSessionCookie } from "@/server/session";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      password?: string;
      displayName?: string;
      orgName?: string;
      orgKind?: string;
    };
    if (!body.email || !body.password || !body.orgName || !body.orgKind) {
      return jsonOk({ error: "Campos obrigatórios ausentes." }, 400);
    }
    if (!(ORG_KINDS as readonly string[]).includes(body.orgKind)) {
      return jsonOk({ error: "Tipo de organização inválido." }, 400);
    }
    const result = await signup({
      email: body.email,
      password: body.password,
      displayName: body.displayName ?? "",
      orgName: body.orgName,
      orgKind: body.orgKind as OrgKind,
    });
    await setSessionCookie(result.token);
    return jsonOk({
      userId: result.userId,
      tenantId: result.tenantId,
    });
  } catch (error) {
    return jsonError(error);
  }
}
