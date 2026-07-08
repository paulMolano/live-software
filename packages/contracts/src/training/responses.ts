import type { Exercise, ExerciseListItem } from './exercise.js';

export type GetExercisesResponse = {
	data: ExerciseListItem[];
};

export type GetExerciseByIdResponse = {
	data: Exercise;
};
