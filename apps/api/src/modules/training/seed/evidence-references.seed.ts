import type { SeedExerciseReference } from './training-seed.types.js';

export const prescriptionEvidenceReferences = [
	{
		sourceType: 'PEER_REVIEWED_REVIEW',
		title: 'Loading Recommendations for Muscle Strength, Hypertrophy, and Local Endurance',
		citation: 'Schoenfeld BJ, Grgic J, Van Every DW, Plotkin DL. Sports. 2021;9(2):32.',
		url: 'https://doi.org/10.3390/sports9020032',
		notes: 'Supports modeling exercise identity separately from loading zone and adaptation target.',
		sortOrder: 1,
	},
	{
		sourceType: 'PEER_REVIEWED_REVIEW',
		title: 'Influence of Resistance Training Proximity-to-Failure on Skeletal Muscle Hypertrophy',
		citation: 'Refalo MC, Helms ER, Trexler ET, Hamilton DL, Fyfe JJ. Sports Medicine. 2023;53:649-665.',
		url: 'https://doi.org/10.1007/s40279-022-01784-y',
		notes: 'Supports keeping effort/proximity-to-failure in future prescription data instead of hardcoding stimulus on exercises.',
		sortOrder: 2,
	},
] as const satisfies readonly SeedExerciseReference[];
