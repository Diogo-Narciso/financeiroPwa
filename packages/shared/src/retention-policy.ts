/**
 * Draft operational retention windows for Portal DIFAL (H11 / P10).
 * Not a legal opinion — values may change after privacy review.
 * Durations in whole days unless noted.
 */
export const RETENTION_POLICY = {
  version: "h11-draft-2026-11-14",
  legalReviewRequired: true,
  classes: {
    authAccount: {
      whileActive: true,
      afterDeletionRequestDays: 30,
    },
    companyCadastro: {
      whileOrgLinked: true,
      note: "Arquivar não libera cota trial (E1).",
    },
    nfeXmlOriginal: {
      immutableStorage: true,
      silentDeleteForbidden: true,
      note: "Custódia do cliente; exclusão só com pedido formal + audit.",
    },
    analysisDerivatives: {
      followSourceDocument: true,
      preferSoftDelete: true,
    },
    auditEvents: {
      hotRetentionDays: 365,
    },
    billingMock: {
      afterInactiveDays: 90,
    },
    appLogs: {
      hotRetentionDays: 30,
      avoidUnnecessaryPii: true,
    },
  },
} as const;

export type RetentionPolicy = typeof RETENTION_POLICY;
