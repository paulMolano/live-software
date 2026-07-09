import { useQuery } from '@tanstack/react-query';
import {
	getFinanceDebtSummary,
	getFinanceMonthlySummary,
	getRecentFinanceTransactions,
} from './financeApi';
import { financeKeys } from './financeKeys';

export function useFinanceMonthlySummary(month: string) {
	return useQuery({
		queryKey: financeKeys.monthlySummary(month),
		queryFn: () => getFinanceMonthlySummary(month),
	});
}

export function useFinanceDebtSummary() {
	return useQuery({
		queryKey: financeKeys.debts(),
		queryFn: getFinanceDebtSummary,
	});
}

export function useRecentFinanceTransactions() {
	return useQuery({
		queryKey: financeKeys.recentTransactions(),
		queryFn: getRecentFinanceTransactions,
	});
}

