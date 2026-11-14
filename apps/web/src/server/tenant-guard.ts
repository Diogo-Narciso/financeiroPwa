/**
 * Tenant isolation helpers (H17) — fail closed on cross-tenant access.
 * App-layer guard; does not replace future Postgres RLS.
 */

export class TenantIsolationError extends Error {
  status = 404;
  code = "TENANT_RESOURCE_NOT_FOUND";
  constructor(message = "Recurso não encontrado neste tenant.") {
    super(message);
    this.name = "TenantIsolationError";
  }
}

export type TenantScoped = {
  tenantId: string;
};

/** True when resource tenant matches the session tenant. */
export function sameTenant(
  sessionTenantId: string,
  resourceTenantId: string | null | undefined,
): boolean {
  if (!sessionTenantId || !resourceTenantId) return false;
  return sessionTenantId === resourceTenantId;
}

/**
 * Returns the resource if it belongs to the session tenant; otherwise throws
 * TenantIsolationError (404 — no existence leak across tenants).
 */
export function assertTenantResource<T extends TenantScoped>(
  sessionTenantId: string,
  resource: T | null | undefined,
  _label = "resource",
): T {
  if (!resource || !sameTenant(sessionTenantId, resource.tenantId)) {
    throw new TenantIsolationError();
  }
  return resource;
}

/** Filter a list down to the session tenant only. */
export function filterByTenant<T extends TenantScoped>(
  sessionTenantId: string,
  rows: T[],
): T[] {
  return rows.filter((r) => sameTenant(sessionTenantId, r.tenantId));
}
