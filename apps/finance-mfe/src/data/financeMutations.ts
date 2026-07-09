import { useMutation, useQueryClient } from '@tanstack/react-query';
import { appEventBus, logPlatformError, logPlatformInfo } from '@live-software/contracts';
import type { CreateFinanceTransactionInput } from '@live-software/contracts';
import { createFinanceTransaction } from './financeApi';
import { financeKeys } from './financeKeys';

export function useCreateFinanceTransaction() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (input: CreateFinanceTransactionInput) =>
			createFinanceTransaction(input),
		onSuccess: (result) => {
			void queryClient.invalidateQueries({ queryKey: financeKeys.all });
			logPlatformInfo('finance-mfe', 'Finance transaction created', {
				transactionId: result.id,
			});
			appEventBus.emit({
				type: 'finance.transaction.created',
				payload: {
					transactionId: result.id,
				},
			});
		},
		onError: (error) => {
			logPlatformError('finance-mfe', error, {
				action: 'createFinanceTransaction',
			});
		},
	});
}
