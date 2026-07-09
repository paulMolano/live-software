export const publicRoutes = {
	dashboard: '/',
	training: '/training',
	trainingSessionDetail: (sessionId: string) =>
		`/training/sessions/${encodeURIComponent(sessionId)}`,
	finance: '/finance',
	financeTransactionDetail: (transactionId: string) =>
		`/finance/transactions/${encodeURIComponent(transactionId)}`,
} as const;

export type PublicRoutePath =
	| typeof publicRoutes.dashboard
	| typeof publicRoutes.training
	| typeof publicRoutes.finance;

