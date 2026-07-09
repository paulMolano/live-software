import { useMutation, useQueryClient } from '@tanstack/react-query';
import { appEventBus, logPlatformError, logPlatformInfo } from '@live-software/contracts';
import type { CreateTrainingSessionInput } from '@live-software/contracts';
import { createTrainingSession } from './trainingApi';
import { trainingKeys } from './trainingKeys';

export function useCreateTrainingSession() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (input: CreateTrainingSessionInput) =>
			createTrainingSession(input),
		onSuccess: (result) => {
			void queryClient.invalidateQueries({ queryKey: trainingKeys.all });
			logPlatformInfo('training-mfe', 'Training session created', {
				sessionId: result.id,
			});
			appEventBus.emit({
				type: 'training.session.created',
				payload: {
					sessionId: result.id,
				},
			});
		},
		onError: (error) => {
			logPlatformError('training-mfe', error, {
				action: 'createTrainingSession',
			});
		},
	});
}
