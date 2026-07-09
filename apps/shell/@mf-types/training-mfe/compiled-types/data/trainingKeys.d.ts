import type { TrainingRange, TrainingSessionFilters } from '@live-software/contracts';
export declare const trainingKeys: {
    all: readonly ["app", "training"];
    summary: () => readonly ["app", "training", "summary"];
    sessions: (filters: TrainingSessionFilters) => readonly ["app", "training", "sessions", TrainingSessionFilters];
    progress: (range: TrainingRange) => readonly ["app", "training", "progress", TrainingRange];
};
