import type { TrainingRange, TrainingView } from '@live-software/contracts';
export type TrainingUrlState = {
    range?: TrainingRange;
    view?: TrainingView;
};
export declare function readTrainingUrlState(): TrainingUrlState;
export declare function writeTrainingUrlState(state: Required<TrainingUrlState>): void;
