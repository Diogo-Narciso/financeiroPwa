import type { OrgKind } from "@portal-difal/shared";
import { getPool, getReadyPool } from "./db";
import { assertPasswordPolicy, hashPassword, verifyPassword } from "./password";
import { audit, createSession } from "./session";

export class AuthServiceError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.name = "AuthServiceError";
    this.status = status;
  }
}

export async function signup(args: {
  email: string;
  password: string;
  displayName: string;
  orgName: string;
  orgKind: OrgKind;
}): Promise<{ userId: string; tenantId: string; token: string }> {
  const email = args.email.trim().toLowerCase();
  if (!email.includes("@")) {
    throw new AuthServiceError("Informe um e-mail válido.");
  }
  const pwdErr = assertPasswordPolicy(args.password);
  if (pwdErr) throw new AuthServiceError(pwdErr);

  const pool = await getReadyPool();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const existing = await client.query(`SELECT id FROM users WHERE email = $1`, [
      email,
    ]);
    if ((existing.rowCount ?? 0) > 0) {
      throw new AuthServiceError("Já existe uma conta com este e-mail.", 409);
    }

    const passwordHash = await hashPassword(args.password);
    const { rows: userRows } = await client.query<{ id: string }>(
      `INSERT INTO users (email, display_name, password_hash, email_verified_at)
       VALUES ($1, $2, $3, NOW())
       RETURNING id`,
      [email, args.displayName.trim() || null, passwordHash],
    );
    const userId = userRows[0]!.id;

    const { rows: orgRows } = await client.query<{ id: string }>(
      `INSERT INTO organizations (name, kind) VALUES ($1, $2) RETURNING id`,
      [args.orgName.trim(), args.orgKind],
    );
    const tenantId = orgRows[0]!.id;

    await client.query(
      `INSERT INTO memberships (tenant_id, user_id, role) VALUES ($1, $2, 'owner')`,
      [tenantId, userId],
    );

    await audit(client, {
      tenantId,
      actorUserId: userId,
      action: "auth.signup",
      entityType: "organization",
      entityId: tenantId,
      detail: { orgKind: args.orgKind },
    });

    await client.query("COMMIT");
    const token = await createSession(userId);
    return { userId, tenantId, token };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function login(args: {
  email: string;
  password: string;
}): Promise<{ userId: string; token: string }> {
  const email = args.email.trim().toLowerCase();
  const pool = await getReadyPool();
  const { rows } = await pool.query<{
    id: string;
    password_hash: string | null;
  }>(`SELECT id, password_hash FROM users WHERE email = $1`, [email]);
  const user = rows[0];
  if (!user?.password_hash) {
    throw new AuthServiceError("E-mail ou senha inválidos.", 401);
  }
  const ok = await verifyPassword(args.password, user.password_hash);
  if (!ok) throw new AuthServiceError("E-mail ou senha inválidos.", 401);
  const token = await createSession(user.id);
  return { userId: user.id, token };
}
