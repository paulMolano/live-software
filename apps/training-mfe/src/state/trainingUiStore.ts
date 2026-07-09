import { create } from 'zustand';
import type { TrainingRange, TrainingView } from '@live-software/contracts';

type TrainingUiState = {
	selectedRange: TrainingRange;
	compactMode: boolean;
	activeView: TrainingView;
	setSelectedRange: (range: TrainingRange) => void;
	setCompactMode: (value: boolean) => void;
	setActiveView: (view: TrainingView) => void;
};

export const useTrainingUiStore = create<TrainingUiState>((set) => ({
	selectedRange: '30d',
	compactMode: false,
	activeView: 'summary',
	setSelectedRange: (selectedRange) => set({ selectedRange }),
	setCompactMode: (compactMode) => set({ compactMode }),
	setActiveView: (activeView) => set({ activeView }),
}));

