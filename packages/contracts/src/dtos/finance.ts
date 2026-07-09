import type { QueryDebugDto } from './platform.js';

export type CurrencyCode = 'EUR';

export type FinanceView = 'summary' | 'debts' | 'expenses' | 'transactions';

export type FinanceMonthlySummaryDto = {
	month: string;
	income: number;
	expenses: number;
	remaining: number;
	debtTotal: number;
	currency: CurrencyCode;
	debug: QueryDebugDto;
};

export type FinanceTransactionDto = {
	id: string;
	date: string;
	description: string;
	amount: number;
	type: 'income' | 'expense';
	category: string;
};

export type FinanceDebtSummaryDto = {
	total: number;
	minimumMonthlyPayment: number;
	currency: CurrencyCode;
};

export type CreateFinanceTransactionInput = {
	description: string;
	amount: number;
	type: 'income' | 'expense';
	category: string;
};
