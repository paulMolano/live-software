type SeedDemandLevel = 'LOW' | 'MEDIUM' | 'HIGH';
type SeedLocale = 'EN' | 'ES';

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
	region: 'UPPER_BODY' | 'LOWER_BODY' | 'CORE' | 'FULL_BODY';
	translations: readonly SeedNameTranslation[];
};

export type SeedEquipment = {
	slug: string;
	category: 'BODYWEIGHT' | 'FREE_WEIGHT' | 'MACHINE' | 'CABLE' | 'BAND' | 'SUPPORT' | 'OTHER';
	translations: readonly SeedNameTranslation[];
};

export type SeedExerciseMuscle = {
	slug: string;
	role: 'PRIMARY' | 'SECONDARY' | 'STABILIZER';
	stimulusLevel: SeedDemandLevel;
	notes?: string;
};

export type SeedExerciseEquipment = {
	slug: string;
	requirement: 'REQUIRED' | 'OPTIONAL' | 'ALTERNATIVE';
};

export type SeedExerciseTip = {
	type: 'SETUP' | 'CUE' | 'COMMON_MISTAKE' | 'SAFETY' | 'PROGRESSION';
	sortOrder: number;
	translations: readonly Array<{
		locale: SeedLocale;
		text: string;
	}>;
};

export type SeedExerciseReference = {
	sourceType: 'PEER_REVIEWED_REVIEW' | 'PEER_REVIEWED_STUDY' | 'TEXTBOOK' | 'PROFESSIONAL_GUIDELINE' | 'CURATED_REFERENCE';
	title: string;
	citation?: string;
	url?: string;
	notes?: string;
	sortOrder: number;
};

export type SeedExercise = {
	slug: string;
	translations: readonly SeedExerciseTranslation[];
	difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
	mechanics: 'COMPOUND' | 'ISOLATION';
	movementPattern:
	| 'SQUAT'
	| 'HINGE'
	| 'HORIZONTAL_PUSH'
	| 'VERTICAL_PUSH'
	| 'HORIZONTAL_PULL'
	| 'VERTICAL_PULL'
	| 'LUNGE'
	| 'CARRY'
	| 'ROTATION'
	| 'ANTI_ROTATION'
	| 'CORE'
	| 'GAIT'
	| 'OTHER';
	laterality: 'BILATERAL' | 'UNILATERAL' | 'ALTERNATING' | 'ASYMMETRICAL';
	kineticChain: 'OPEN' | 'CLOSED' | 'MIXED';
	resistanceCurve: 'CONSTANT' | 'ASCENDING' | 'DESCENDING' | 'VARIABLE' | 'BODYWEIGHT_VARIABLE' | 'UNKNOWN';
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
