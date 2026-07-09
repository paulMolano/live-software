import type { CreateFinanceTransactionInput, FinanceDebtSummaryDto, FinanceMonthlySummaryDto, FinanceTransactionDto } from '@live-software/contracts';
export declare function getFinanceMonthlySummary(month: string): Promise<FinanceMonthlySummaryDto>;
export declare function getFinanceDebtSummary(): Promise<FinanceDebtSummaryDto>;
export declare function getRecentFinanceTransactions(): Promise<FinanceTransactionDto[]>;
export declare function createFinanceTransaction(input: CreateFinanceTransactionInput): Promise<FinanceTransactionDto>;
