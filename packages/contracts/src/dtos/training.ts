import type { QueryDebugDto } from './platform.js';

export const trainingRanges = ['7d', '30d', '90d'] as const;
export type TrainingRange = (typeof trainingRanges)[number];

export const trainingViews = ['summary', 'sessions', 'progress'] as const;
export type TrainingView = (typeof trainingViews)[number];

export const trainingSessionTypes = ['strength', 'cardio', 'mobility'] as const;
export type TrainingSessionType = (typeof trainingSessionTypes)[number];

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
