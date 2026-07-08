import type { EvidenceSourceType } from './enums.js';

export type ExerciseEvidenceReference = {
	id: string;
	sourceType: EvidenceSourceType;
	title: string;
	citation?: string;
	url?: string;
	notes?: string;
	sortOrder: number;
};
