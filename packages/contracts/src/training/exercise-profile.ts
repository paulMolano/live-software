import type {
	DemandLevel,
	ExerciseLaterality,
	ExerciseMechanics,
	KineticChain,
	MovementPattern,
	ResistanceCurve,
} from './enums.js';

export type ExerciseBiomechanics = {
	mechanics: ExerciseMechanics;
	movementPattern: MovementPattern;
	laterality: ExerciseLaterality;
	kineticChain: KineticChain;
	resistanceCurve: ResistanceCurve;
};

export type ExerciseDemandProfile = {
	technical: DemandLevel;
	mobility: DemandLevel;
	stability: DemandLevel;
	axialLoad: DemandLevel;
	lumbar: DemandLevel;
	shoulder: DemandLevel;
	knee: DemandLevel;
	setupComplexity: DemandLevel;
	spaceRequirement: DemandLevel;
};

export type ExerciseContext = {
	requiresSpotter: boolean;
	gymRequired: boolean;
	homeFriendly: boolean;
};
