import { QueryClient } from '@tanstack/react-query';

export const appQueryKeys = {
	all: ['app'] as const,
	shell: () => [...appQueryKeys.all, 'shell'] as const,
	training: () => [...appQueryKeys.all, 'training'] as const,
	trainingExercises: (trainingId: string) =>
		[...appQueryKeys.training(), 'exercises', trainingId] as const,
};

export function createAppQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60_000,
				gcTime: 5 * 60_000,
				retry: 1,
				refetchOnWindowFocus: false,
				refetchOnReconnect: true,
			},
			mutations: {
				retry: 0,
			},
		},
	});
}
