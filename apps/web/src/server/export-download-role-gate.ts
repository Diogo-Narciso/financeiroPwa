/** Roles allowed for export create/download (H49 / H54 / E-R03). */
export const EXPORT_DOWNLOAD_ROLES = [
  "owner",
  "admin",
  "reviewer",
  "analyst",
] as const;

export type ExportDownloadRole = (typeof EXPORT_DOWNLOAD_ROLES)[number];

export function canAccessExportDownload(role: string): boolean {
  return (EXPORT_DOWNLOAD_ROLES as readonly string[]).includes(role);
}
