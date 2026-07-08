import type { BodyRegion, MuscleRole, StimulusLevel } from './enums.js';

export type MuscleGroup = {
	id: string;
	slug: string;
	name: string;
	region: BodyRegion;
};

export type ExerciseMuscle = {
	muscleGroup: MuscleGroup;
	role: MuscleRole;
	stimulusLevel: StimulusLevel;
	notes?: string;
};
