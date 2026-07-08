export const supportedLocales = ['en', 'es'] as const;
export type LocaleCode = (typeof supportedLocales)[number];

export const exerciseDifficulties = ['beginner', 'intermediate', 'advanced'] as const;
export type ExerciseDifficulty = (typeof exerciseDifficulties)[number];

export const exerciseMechanics = ['compound', 'isolation'] as const;
export type ExerciseMechanics = (typeof exerciseMechanics)[number];

export const movementPatterns = [
	'squat',
	'hinge',
	'horizontal_push',
	'vertical_push',
	'horizontal_pull',
	'vertical_pull',
	'lunge',
	'carry',
	'rotation',
	'anti_rotation',
	'core',
	'gait',
	'other',
] as const;
export type MovementPattern = (typeof movementPatterns)[number];

export const exerciseLateralities = ['bilateral', 'unilateral', 'alternating', 'asymmetrical'] as const;
export type ExerciseLaterality = (typeof exerciseLateralities)[number];

export const kineticChains = ['open', 'closed', 'mixed'] as const;
export type KineticChain = (typeof kineticChains)[number];

export const resistanceCurves = [
	'constant',
	'ascending',
	'descending',
	'variable',
	'bodyweight_variable',
	'unknown',
] as const;
export type ResistanceCurve = (typeof resistanceCurves)[number];

export const demandLevels = ['low', 'medium', 'high'] as const;
export type DemandLevel = (typeof demandLevels)[number];

export const bodyRegions = ['upper_body', 'lower_body', 'core', 'full_body'] as const;
export type BodyRegion = (typeof bodyRegions)[number];

export const muscleRoles = ['primary', 'secondary', 'stabilizer'] as const;
export type MuscleRole = (typeof muscleRoles)[number];

export const stimulusLevels = ['low', 'medium', 'high'] as const;
export type StimulusLevel = (typeof stimulusLevels)[number];

export const equipmentCategories = [
	'bodyweight',
	'free_weight',
	'machine',
	'cable',
	'band',
	'support',
	'other',
] as const;
export type EquipmentCategory = (typeof equipmentCategories)[number];

export const equipmentRequirements = ['required', 'optional', 'alternative'] as const;
export type EquipmentRequirement = (typeof equipmentRequirements)[number];

export const exerciseTipTypes = ['setup', 'cue', 'common_mistake', 'safety', 'progression'] as const;
export type ExerciseTipType = (typeof exerciseTipTypes)[number];

export const exerciseMediaKinds = ['image', 'video', 'animation', 'other'] as const;
export type ExerciseMediaKind = (typeof exerciseMediaKinds)[number];

export const evidenceSourceTypes = [
	'peer_reviewed_review',
	'peer_reviewed_study',
	'textbook',
	'professional_guideline',
	'curated_reference',
] as const;
export type EvidenceSourceType = (typeof evidenceSourceTypes)[number];
