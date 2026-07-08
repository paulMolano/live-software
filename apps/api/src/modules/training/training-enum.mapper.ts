import type {
	BodyRegion,
	DemandLevel,
	EquipmentCategory,
	EquipmentRequirement,
	EvidenceSourceType,
	ExerciseDifficulty,
	ExerciseLaterality,
	ExerciseMechanics,
	ExerciseMediaKind,
	ExerciseTipType,
	KineticChain,
	LocaleCode,
	MovementPattern,
	MuscleRole,
	ResistanceCurve,
	StimulusLevel,
} from '@live-software/contracts';

const difficultyMap: Record<string, ExerciseDifficulty> = {
	BEGINNER: 'beginner',
	INTERMEDIATE: 'intermediate',
	ADVANCED: 'advanced',
};

const mechanicsMap: Record<string, ExerciseMechanics> = {
	COMPOUND: 'compound',
	ISOLATION: 'isolation',
};

const movementPatternMap: Record<string, MovementPattern> = {
	SQUAT: 'squat',
	HINGE: 'hinge',
	HORIZONTAL_PUSH: 'horizontal_push',
	VERTICAL_PUSH: 'vertical_push',
	HORIZONTAL_PULL: 'horizontal_pull',
	VERTICAL_PULL: 'vertical_pull',
	LUNGE: 'lunge',
	CARRY: 'carry',
	ROTATION: 'rotation',
	ANTI_ROTATION: 'anti_rotation',
	CORE: 'core',
	GAIT: 'gait',
	OTHER: 'other',
};

const lateralityMap: Record<string, ExerciseLaterality> = {
	BILATERAL: 'bilateral',
	UNILATERAL: 'unilateral',
	ALTERNATING: 'alternating',
	ASYMMETRICAL: 'asymmetrical',
};

const kineticChainMap: Record<string, KineticChain> = {
	OPEN: 'open',
	CLOSED: 'closed',
	MIXED: 'mixed',
};

const resistanceCurveMap: Record<string, ResistanceCurve> = {
	CONSTANT: 'constant',
	ASCENDING: 'ascending',
	DESCENDING: 'descending',
	VARIABLE: 'variable',
	BODYWEIGHT_VARIABLE: 'bodyweight_variable',
	UNKNOWN: 'unknown',
};

const demandLevelMap: Record<string, DemandLevel> = {
	LOW: 'low',
	MEDIUM: 'medium',
	HIGH: 'high',
};

const bodyRegionMap: Record<string, BodyRegion> = {
	UPPER_BODY: 'upper_body',
	LOWER_BODY: 'lower_body',
	CORE: 'core',
	FULL_BODY: 'full_body',
};

const muscleRoleMap: Record<string, MuscleRole> = {
	PRIMARY: 'primary',
	SECONDARY: 'secondary',
	STABILIZER: 'stabilizer',
};

const stimulusLevelMap: Record<string, StimulusLevel> = {
	LOW: 'low',
	MEDIUM: 'medium',
	HIGH: 'high',
};

const equipmentCategoryMap: Record<string, EquipmentCategory> = {
	BODYWEIGHT: 'bodyweight',
	FREE_WEIGHT: 'free_weight',
	MACHINE: 'machine',
	CABLE: 'cable',
	BAND: 'band',
	SUPPORT: 'support',
	OTHER: 'other',
};

const equipmentRequirementMap: Record<string, EquipmentRequirement> = {
	REQUIRED: 'required',
	OPTIONAL: 'optional',
	ALTERNATIVE: 'alternative',
};

const tipTypeMap: Record<string, ExerciseTipType> = {
	SETUP: 'setup',
	CUE: 'cue',
	COMMON_MISTAKE: 'common_mistake',
	SAFETY: 'safety',
	PROGRESSION: 'progression',
};

const mediaKindMap: Record<string, ExerciseMediaKind> = {
	IMAGE: 'image',
	VIDEO: 'video',
	ANIMATION: 'animation',
	OTHER: 'other',
};

const localeMap: Record<string, LocaleCode> = {
	EN: 'en',
	ES: 'es',
};

const evidenceSourceTypeMap: Record<string, EvidenceSourceType> = {
	PEER_REVIEWED_REVIEW: 'peer_reviewed_review',
	PEER_REVIEWED_STUDY: 'peer_reviewed_study',
	TEXTBOOK: 'textbook',
	PROFESSIONAL_GUIDELINE: 'professional_guideline',
	CURATED_REFERENCE: 'curated_reference',
};

function mapEnum<TValue extends string>(map: Record<string, TValue>, value: string): TValue {
	const mappedValue = map[value];

	if (mappedValue === undefined) {
		throw new Error(`Unsupported training enum value: ${value}`);
	}

	return mappedValue;
}

export function toContractDifficulty(value: string): ExerciseDifficulty {
	return mapEnum(difficultyMap, value);
}

export function toContractMechanics(value: string): ExerciseMechanics {
	return mapEnum(mechanicsMap, value);
}

export function toContractMovementPattern(value: string): MovementPattern {
	return mapEnum(movementPatternMap, value);
}

export function toContractLaterality(value: string): ExerciseLaterality {
	return mapEnum(lateralityMap, value);
}

export function toContractKineticChain(value: string): KineticChain {
	return mapEnum(kineticChainMap, value);
}

export function toContractResistanceCurve(value: string): ResistanceCurve {
	return mapEnum(resistanceCurveMap, value);
}

export function toContractDemandLevel(value: string): DemandLevel {
	return mapEnum(demandLevelMap, value);
}

export function toContractBodyRegion(value: string): BodyRegion {
	return mapEnum(bodyRegionMap, value);
}

export function toContractMuscleRole(value: string): MuscleRole {
	return mapEnum(muscleRoleMap, value);
}

export function toContractStimulusLevel(value: string): StimulusLevel {
	return mapEnum(stimulusLevelMap, value);
}

export function toContractEquipmentCategory(value: string): EquipmentCategory {
	return mapEnum(equipmentCategoryMap, value);
}

export function toContractEquipmentRequirement(value: string): EquipmentRequirement {
	return mapEnum(equipmentRequirementMap, value);
}

export function toContractTipType(value: string): ExerciseTipType {
	return mapEnum(tipTypeMap, value);
}

export function toContractMediaKind(value: string): ExerciseMediaKind {
	return mapEnum(mediaKindMap, value);
}

export function toContractLocale(value: string): LocaleCode {
	return mapEnum(localeMap, value);
}

export function toContractEvidenceSourceType(value: string): EvidenceSourceType {
	return mapEnum(evidenceSourceTypeMap, value);
}
