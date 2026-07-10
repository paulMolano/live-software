import type { Prisma } from '../../generated/prisma/client.js';

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
} as const satisfies Prisma.ExerciseInclude;

export type ExerciseRecord = Prisma.ExerciseGetPayload<{
	include: typeof trainingExerciseInclude;
}>;
