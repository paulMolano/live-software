import type { SeedExercise } from '../training-seed.types.js';
import { coreExercises } from './core.seed.js';
import { lowerBodyExercises } from './lower-body.seed.js';
import { upperBodyExercises } from './upper-body.seed.js';

export const exerciseCatalog = [
	...lowerBodyExercises,
	...upperBodyExercises,
	...coreExercises,
] as const satisfies readonly SeedExercise[];
