import {
	BodyRegion,
	DemandLevel,
	EquipmentCategory,
	EquipmentRequirement,
	EvidenceSourceType,
	ExerciseDifficulty,
	ExerciseLaterality,
	ExerciseMechanics,
	ExerciseTipType,
	KineticChain,
	MovementPattern,
	MuscleRole,
	ResistanceCurve,
	StimulusLevel,
	SupportedLocale,
} from '../../../generated/prisma/enums.js';

type EnumValue<TEnum extends Record<string, string>> = TEnum[keyof TEnum];

type SeedDemandLevel = EnumValue<typeof DemandLevel>;
type SeedLocale = EnumValue<typeof SupportedLocale>;

export type SeedNameTranslation = {
	locale: SeedLocale;
	name: string;
};

export type SeedExerciseTranslation = SeedNameTranslation & {
	aliases: readonly string[];
	summary: string;
	description: string;
};

export type SeedMuscleGroup = {
	slug: string;
	region: EnumValue<typeof BodyRegion>;
	translations: readonly SeedNameTranslation[];
};

export type SeedEquipment = {
	slug: string;
	category: EnumValue<typeof EquipmentCategory>;
	translations: readonly SeedNameTranslation[];
};

export type SeedExerciseMuscle = {
	slug: string;
	role: EnumValue<typeof MuscleRole>;
	stimulusLevel: SeedDemandLevel;
	notes?: string;
};

export type SeedExerciseEquipment = {
	slug: string;
	requirement: EnumValue<typeof EquipmentRequirement>;
};

export type SeedExerciseTip = {
	type: EnumValue<typeof ExerciseTipType>;
	sortOrder: number;
	translations: readonly Array<{
		locale: SeedLocale;
		text: string;
	}>;
};

export type SeedExerciseReference = {
	sourceType: EnumValue<typeof EvidenceSourceType>;
	title: string;
	citation?: string;
	url?: string;
	notes?: string;
	sortOrder: number;
};

export type SeedExercise = {
	slug: string;
	translations: readonly SeedExerciseTranslation[];
	difficulty: EnumValue<typeof ExerciseDifficulty>;
	mechanics: EnumValue<typeof ExerciseMechanics>;
	movementPattern: EnumValue<typeof MovementPattern>;
	laterality: EnumValue<typeof ExerciseLaterality>;
	kineticChain: EnumValue<typeof KineticChain>;
	resistanceCurve: EnumValue<typeof ResistanceCurve>;
	technicalDemand: SeedDemandLevel;
	mobilityDemand: SeedDemandLevel;
	stabilityDemand: SeedDemandLevel;
	axialLoad: SeedDemandLevel;
	lumbarDemand: SeedDemandLevel;
	shoulderDemand: SeedDemandLevel;
	kneeDemand: SeedDemandLevel;
	setupComplexity: SeedDemandLevel;
	spaceRequirement: SeedDemandLevel;
	requiresSpotter: boolean;
	gymRequired: boolean;
	homeFriendly: boolean;
	muscles: readonly SeedExerciseMuscle[];
	equipment: readonly SeedExerciseEquipment[];
	tips: readonly SeedExerciseTip[];
	references: readonly SeedExerciseReference[];
};
