import type { QueryDebugDto } from './platform.js';

export type TrainingRange = '7d' | '30d' | '90d';

export type TrainingView = 'summary' | 'sessions' | 'progress';

export type TrainingSessionType = 'strength' | 'cardio' | 'mobility';

export type TrainingSummaryDto = {
	weeklySessions: number;
	weeklyTarget: number;
	lastSessionDate: string | null;
	currentStreak: number;
	debug: QueryDebugDto;
};

export type TrainingSessionDto = {
	id: string;
	date: string;
	type: TrainingSessionType;
	title: string;
	durationMinutes: number;
};

export type TrainingSessionFilters = {
	range: TrainingRange;
};

export type CreateTrainingSessionInput = {
	type: TrainingSessionType;
	title: string;
	durationMinutes: number;
};
