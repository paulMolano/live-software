import type {
	TrainingRange,
	TrainingSessionFilters,
} from '@live-software/contracts';

export const trainingKeys = {
	all: ['app', 'training'] as const,
	summary: () => [...trainingKeys.all, 'summary'] as const,
	sessions: (filters: TrainingSessionFilters) =>
		[...trainingKeys.all, 'sessions', filters] as const,
	progress: (range: TrainingRange) =>
		[...trainingKeys.all, 'progress', range] as const,
};

