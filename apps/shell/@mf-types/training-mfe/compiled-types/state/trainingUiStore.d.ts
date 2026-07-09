import type { TrainingRange, TrainingView } from '@live-software/contracts';
type TrainingUiState = {
    selectedRange: TrainingRange;
    compactMode: boolean;
    activeView: TrainingView;
    setSelectedRange: (range: TrainingRange) => void;
    setCompactMode: (value: boolean) => void;
    setActiveView: (view: TrainingView) => void;
};
export declare const useTrainingUiStore: import("zustand").UseBoundStore<import("zustand").StoreApi<TrainingUiState>>;
export {};
