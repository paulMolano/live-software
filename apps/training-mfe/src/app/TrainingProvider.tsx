import { QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { trainingQueryClient } from './trainingQueryClient';

type TrainingProviderProps = {
	children: ReactNode;
};

export function TrainingProvider({ children }: TrainingProviderProps) {
	return (
		<QueryClientProvider client={trainingQueryClient}>
			{children}
		</QueryClientProvider>
	);
}

