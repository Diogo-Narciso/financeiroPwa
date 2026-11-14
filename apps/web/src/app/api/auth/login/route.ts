import { login } from "@/server/auth-service";
import { jsonError, jsonOk } from "@/server/http";
import { setSessionCookie } from "@/server/session";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string; password?: string };
    if (!body.email || !body.password) {
      return jsonOk({ error: "Informe e-mail e senha." }, 400);
    }
    const result = await login({ email: body.email, password: body.password });
    await setSessionCookie(result.token);
    return jsonOk({ userId: result.userId });
  } catch (error) {
    return jsonError(error);
  }
}
