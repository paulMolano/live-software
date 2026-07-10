import type {
	BodyRegion,
	EquipmentRequirement,
	EvidenceSourceType,
	ExerciseDifficulty,
	ExerciseLaterality,
	ExerciseMechanics,
	ExerciseTipType,
	KineticChain,
	LocaleCode,
	MovementPattern,
	MuscleRole,
	ResistanceCurve,
	StimulusLevel,
	DemandLevel,
} from './enums.js';

export type GetExercisesQuery = {
	locale?: LocaleCode;
	difficulty?: ExerciseDifficulty;
	mechanics?: ExerciseMechanics;
	movementPattern?: MovementPattern;
	bodyRegion?: BodyRegion;
	muscleSlug?: string;
	equipmentSlug?: string;
	search?: string;
};

export type ExerciseMutationTranslationInput = {
	locale: LocaleCode;
	name: string;
	aliases?: string[];
	summary: string;
	description?: string;
};

export type ExerciseMutationMuscleInput = {
	slug: string;
	role: MuscleRole;
	stimulusLevel: StimulusLevel;
	notes?: string;
};

export type ExerciseMutationEquipmentInput = {
	slug: string;
	requirement: EquipmentRequirement;
};

export type ExerciseMutationTipInput = {
	type: ExerciseTipType;
	sortOrder?: number;
	translations: Array<{
		locale: LocaleCode;
		text: string;
	}>;
};

export type ExerciseMutationReferenceInput = {
	sourceType: EvidenceSourceType;
	title: string;
	citation?: string;
	url?: string;
	notes?: string;
	sortOrder?: number;
};

export type CreateExerciseInput = {
	slug: string;
	translations: ExerciseMutationTranslationInput[];
	difficulty?: ExerciseDifficulty;
	mechanics?: ExerciseMechanics;
	movementPattern?: MovementPattern;
	laterality?: ExerciseLaterality;
	kineticChain?: KineticChain;
	resistanceCurve?: ResistanceCurve;
	technicalDemand?: DemandLevel;
	mobilityDemand?: DemandLevel;
	stabilityDemand?: DemandLevel;
	axialLoad?: DemandLevel;
	lumbarDemand?: DemandLevel;
	shoulderDemand?: DemandLevel;
	kneeDemand?: DemandLevel;
	setupComplexity?: DemandLevel;
	spaceRequirement?: DemandLevel;
	requiresSpotter?: boolean;
	gymRequired?: boolean;
	homeFriendly?: boolean;
	muscles?: ExerciseMutationMuscleInput[];
	equipment?: ExerciseMutationEquipmentInput[];
	tips?: ExerciseMutationTipInput[];
	references?: ExerciseMutationReferenceInput[];
};

export type UpdateExerciseInput = Partial<CreateExerciseInput>;
