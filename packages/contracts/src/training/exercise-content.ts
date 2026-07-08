import type { ExerciseMediaKind, ExerciseTipType } from './enums.js';

export type ExerciseTip = {
	id: string;
	type: ExerciseTipType;
	text: string;
	sortOrder: number;
};

export type ExerciseMedia = {
	id: string;
	kind: ExerciseMediaKind;
	url?: string;
	altText?: string;
	sortOrder: number;
};
