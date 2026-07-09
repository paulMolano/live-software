import type {
	CreateFinanceTransactionInput,
	FinanceDebtSummaryDto,
	FinanceMonthlySummaryDto,
	FinanceTransactionDto,
} from '@live-software/contracts';

let transactionCounter = 5;
let financeMonthlySummaryFetchCount = 0;

const mockTransactions: FinanceTransactionDto[] = [
	{
		id: 'finance-transaction-4',
		date: '2026-07-07T09:00:00.000Z',
		description: 'Nomina',
		amount: 2800,
		type: 'income',
		category: 'salary',
	},
	{
		id: 'finance-transaction-3',
		date: '2026-07-06T19:20:00.000Z',
		description: 'Supermercado',
		amount: 84.35,
		type: 'expense',
		category: 'food',
	},
	{
		id: 'finance-transaction-2',
		date: '2026-07-04T12:10:00.000Z',
		description: 'Transporte',
		amount: 32.5,
		type: 'expense',
		category: 'mobility',
	},
	{
		id: 'finance-transaction-1',
		date: '2026-07-02T20:15:00.000Z',
		description: 'Curso tecnico',
		amount: 49,
		type: 'expense',
		category: 'learning',
	},
];

const mockDebtSummary: FinanceDebtSummaryDto = {
	total: 1420,
	minimumMonthlyPayment: 180,
	currency: 'EUR',
};

function delay<TValue>(value: TValue): Promise<TValue> {
	return new Promise((resolve) => {
		window.setTimeout(() => resolve(value), 140);
	});
}

function transactionIsInMonth(
	transaction: FinanceTransactionDto,
	month: string,
): boolean {
	return transaction.date.startsWith(month);
}

export async function getFinanceMonthlySummary(
	month: string,
): Promise<FinanceMonthlySummaryDto> {
	financeMonthlySummaryFetchCount += 1;
	const monthTransactions = mockTransactions.filter((transaction) =>
		transactionIsInMonth(transaction, month),
	);
	const income = monthTransactions
		.filter((transaction) => transaction.type === 'income')
		.reduce((total, transaction) => total + transaction.amount, 0);
	const expenses = monthTransactions
		.filter((transaction) => transaction.type === 'expense')
		.reduce((total, transaction) => total + transaction.amount, 0);

	return delay({
		month,
		income,
		expenses,
		remaining: income - expenses,
		debtTotal: mockDebtSummary.total,
		currency: 'EUR',
		debug: {
			fetchCount: financeMonthlySummaryFetchCount,
			fetchedAt: new Date().toISOString(),
		},
	});
}

export async function getFinanceDebtSummary(): Promise<FinanceDebtSummaryDto> {
	return delay(mockDebtSummary);
}

export async function getRecentFinanceTransactions(): Promise<
	FinanceTransactionDto[]
> {
	return delay([...mockTransactions].slice(0, 5));
}

export async function createFinanceTransaction(
	input: CreateFinanceTransactionInput,
): Promise<FinanceTransactionDto> {
	const transaction: FinanceTransactionDto = {
		id: `finance-transaction-${transactionCounter}`,
		date: new Date().toISOString(),
		description: input.description,
		amount: input.amount,
		type: input.type,
		category: input.category,
	};

	transactionCounter += 1;
	mockTransactions.unshift(transaction);

	return delay(transaction);
}
