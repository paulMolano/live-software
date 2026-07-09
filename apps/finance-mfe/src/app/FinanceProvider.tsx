import { QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { financeQueryClient } from './financeQueryClient';

type FinanceProviderProps = {
	children: ReactNode;
};

export function FinanceProvider({ children }: FinanceProviderProps) {
	return (
		<QueryClientProvider client={financeQueryClient}>
			{children}
		</QueryClientProvider>
	);
}

