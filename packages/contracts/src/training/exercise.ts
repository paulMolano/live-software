import type {
	ExerciseDifficulty,
	LocaleCode,
} from './enums.js';
import type { ExerciseEvidenceReference } from './evidence.js';
import type { ExerciseMedia, ExerciseTip } from './exercise-content.js';
import type { ExerciseContext, ExerciseBiomechanics, ExerciseDemandProfile } from './exercise-profile.js';
import type { ExerciseEquipment } from './equipment.js';
import type { ExerciseMuscle } from './muscle.js';

export type ExerciseListItem = {
	id: string;
	slug: string;
	locale: LocaleCode;
	name: string;
	aliases: string[];
	summary: string;
	difficulty: ExerciseDifficulty;
	biomechanics: ExerciseBiomechanics;
	demandProfile: ExerciseDemandProfile;
	context: ExerciseContext;
	primaryMuscles: ExerciseMuscle[];
	equipment: ExerciseEquipment[];
};

export type Exercise = ExerciseListItem & {
	description?: string;
	muscles: ExerciseMuscle[];
	tips: ExerciseTip[];
	media: ExerciseMedia[];
	references: ExerciseEvidenceReference[];
	createdAt: string;
	updatedAt: string;
};
