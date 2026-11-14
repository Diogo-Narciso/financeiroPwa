import { listPlans } from "@/server/billing";
import { jsonError, jsonOk } from "@/server/http";
import { requireUser } from "@/server/session";

export const runtime = "nodejs";

export async function GET() {
  try {
    await requireUser();
    const plans = await listPlans();
    return jsonOk({
      plans,
      provider: "mock_sandbox",
      notice:
        "Preços com is_price_placeholder=true NÃO são oficiais. Ofertas pagas não publicáveis.",
    });
  } catch (error) {
    return jsonError(error);
  }
}
