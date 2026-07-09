import { useQuery } from '@tanstack/react-query';
import type { TrainingSessionFilters } from '@live-software/contracts';
import {
	getTrainingSessions,
	getTrainingSummary,
} from './trainingApi';
import { trainingKeys } from './trainingKeys';

export function useTrainingSummary() {
	return useQuery({
		queryKey: trainingKeys.summary(),
		queryFn: getTrainingSummary,
	});
}

export function useTrainingSessions(filters: TrainingSessionFilters) {
	return useQuery({
		queryKey: trainingKeys.sessions(filters),
		queryFn: () => getTrainingSessions(filters),
	});
}

