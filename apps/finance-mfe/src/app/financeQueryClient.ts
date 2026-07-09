import { QueryClient } from '@tanstack/react-query';

// Finance data can become stale faster than training summaries, so the stale
// window is shorter while keeping cache ownership inside this MFE.
export const financeQueryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 2 * 60 * 1000,
			gcTime: 30 * 60 * 1000,
			refetchOnWindowFocus: false,
			retry: 1,
		},
		mutations: {
			retry: 0,
		},
	},
});

