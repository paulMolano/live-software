import { QueryClientProvider } from '@tanstack/react-query';
import { createAppQueryClient } from '@live-software/config';
import type { ReactNode } from 'react';

const platformQueryClient = createAppQueryClient();

type PlatformQueryProviderProps = {
	children: ReactNode;
};

export function PlatformQueryProvider({ children }: PlatformQueryProviderProps) {
	return (
		<QueryClientProvider client={platformQueryClient}>
			{children}
		</QueryClientProvider>
	);
}

