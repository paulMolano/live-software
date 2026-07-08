export type MuscleGroupRecord = {
	id: string;
	slug: string;
	region: string;
	translations: Array<{
		locale: string;
		name: string;
	}>;
};

export type EquipmentRecord = {
	id: string;
	slug: string;
	category: string;
	translations: Array<{
		locale: string;
		name: string;
	}>;
};

export type ExerciseRecord = {
	id: string;
	slug: string;
	difficulty: string;
	mechanics: string;
	movementPattern: string;
	laterality: string;
	kineticChain: string;
	resistanceCurve: string;
	technicalDemand: string;
	mobilityDemand: string;
	stabilityDemand: string;
	axialLoad: string;
	lumbarDemand: string;
	shoulderDemand: string;
	kneeDemand: string;
	setupComplexity: string;
	spaceRequirement: string;
	requiresSpotter: boolean;
	gymRequired: boolean;
	homeFriendly: boolean;
	createdAt: Date;
	updatedAt: Date;
	translations: Array<{
		locale: string;
		name: string;
		aliases: string[];
		summary: string;
		description: string | null;
	}>;
	muscles: Array<{
		role: string;
		stimulusLevel: string;
		notes: string | null;
		muscleGroup: MuscleGroupRecord;
	}>;
	equipment: Array<{
		requirement: string;
		equipment: EquipmentRecord;
	}>;
	tips: Array<{
		id: string;
		type: string;
		sortOrder: number;
		translations: Array<{
			locale: string;
			text: string;
		}>;
	}>;
	media: Array<{
		id: string;
		kind: string;
		url: string | null;
		sortOrder: number;
		translations: Array<{
			locale: string;
			altText: string | null;
		}>;
	}>;
	references: Array<{
		id: string;
		sourceType: string;
		title: string;
		citation: string | null;
		url: string | null;
		notes: string | null;
		sortOrder: number;
	}>;
};

export const trainingExerciseInclude = {
	translations: true,
	muscles: {
		include: {
			muscleGroup: {
				include: {
					translations: true,
				},
			},
		},
	},
	equipment: {
		include: {
			equipment: {
				include: {
					translations: true,
				},
			},
		},
	},
	tips: {
		include: {
			translations: true,
		},
		orderBy: {
			sortOrder: 'asc',
		},
	},
	media: {
		include: {
			translations: true,
		},
		orderBy: {
			sortOrder: 'asc',
		},
	},
	references: {
		orderBy: {
			sortOrder: 'asc',
		},
	},
} as const;
