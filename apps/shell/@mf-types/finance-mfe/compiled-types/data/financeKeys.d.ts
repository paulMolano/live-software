export declare const financeKeys: {
    all: readonly ["app", "finance"];
    monthlySummary: (month: string) => readonly ["app", "finance", "monthly-summary", string];
    debts: () => readonly ["app", "finance", "debts"];
    expenses: (month: string) => readonly ["app", "finance", "expenses", string];
    recentTransactions: () => readonly ["app", "finance", "recent-transactions"];
};
