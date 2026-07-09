export const financeKeys = {
	all: ['app', 'finance'] as const,
	monthlySummary: (month: string) =>
		[...financeKeys.all, 'monthly-summary', month] as const,
	debts: () => [...financeKeys.all, 'debts'] as const,
	expenses: (month: string) => [...financeKeys.all, 'expenses', month] as const,
	recentTransactions: () =>
		[...financeKeys.all, 'recent-transactions'] as const,
};

