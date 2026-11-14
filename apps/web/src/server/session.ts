import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import type pg from "pg";
import { getPool } from "./db";

export const SESSION_COOKIE = "portal_difal_session";
const SESSION_DAYS = 14;

export type SessionUser = {
  id: string;
  email: string;
  displayName: string | null;
  tenantId: string;
  orgName: string;
  orgKind: string;
  role: string;
};

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export async function createSession(userId: string): Promise<string> {
  const token = randomBytes(32).toString("hex");
  const tokenHash = hashToken(token);
  const expires = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  const pool = getPool();
  await pool.query(
    `INSERT INTO sessions (user_id, token_hash, expires_at) VALUES ($1, $2, $3)`,
    [userId, tokenHash, expires.toISOString()],
  );
  return token;
}

export async function destroySession(token: string | undefined): Promise<void> {
  if (!token) return;
  await getPool().query(`DELETE FROM sessions WHERE token_hash = $1`, [
    hashToken(token),
  ]);
}

export async function readSessionUser(
  token: string | undefined,
): Promise<SessionUser | null> {
  if (!token) return null;
  const { rows } = await getPool().query<{
    id: string;
    email: string;
    display_name: string | null;
    tenant_id: string;
    org_name: string;
    org_kind: string;
    role: string;
  }>(
    `SELECT u.id, u.email, u.display_name,
            m.tenant_id, o.name AS org_name, o.kind AS org_kind, m.role
     FROM sessions s
     JOIN users u ON u.id = s.user_id
     JOIN memberships m ON m.user_id = u.id
     JOIN organizations o ON o.id = m.tenant_id
     WHERE s.token_hash = $1 AND s.expires_at > NOW()
     ORDER BY m.created_at ASC
     LIMIT 1`,
    [hashToken(token)],
  );
  const row = rows[0];
  if (!row) return null;
  return {
    id: row.id,
    email: row.email,
    displayName: row.display_name,
    tenantId: row.tenant_id,
    orgName: row.org_name,
    orgKind: row.org_kind,
    role: row.role,
  };
}

export async function requireUser(): Promise<SessionUser> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  const user = await readSessionUser(token);
  if (!user) {
    throw new AuthError("Não autenticado.");
  }
  return user;
}

export class AuthError extends Error {
  status = 401;
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}

export async function setSessionCookie(token: string): Promise<void> {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export async function audit(
  client: pg.PoolClient | pg.Pool,
  args: {
    tenantId?: string | null;
    actorUserId?: string | null;
    action: string;
    entityType?: string;
    entityId?: string;
    detail?: Record<string, unknown>;
  },
): Promise<void> {
  await client.query(
    `INSERT INTO audit_events (tenant_id, actor_user_id, action, entity_type, entity_id, detail)
     VALUES ($1, $2, $3, $4, $5, $6::jsonb)`,
    [
      args.tenantId ?? null,
      args.actorUserId ?? null,
      args.action,
      args.entityType ?? null,
      args.entityId ?? null,
      JSON.stringify(args.detail ?? {}),
    ],
  );
}
