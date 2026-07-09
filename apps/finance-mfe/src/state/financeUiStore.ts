import { create } from 'zustand';
import type { FinanceView } from '@live-software/contracts';

function getCurrentMonth(): string {
	return new Date().toISOString().slice(0, 7);
}

type FinanceUiState = {
	selectedMonth: string;
	selectedFinanceView: FinanceView;
	hideSensitiveAmounts: boolean;
	setSelectedMonth: (month: string) => void;
	setSelectedFinanceView: (view: FinanceView) => void;
	setHideSensitiveAmounts: (value: boolean) => void;
};

export const useFinanceUiStore = create<FinanceUiState>((set) => ({
	selectedMonth: getCurrentMonth(),
	selectedFinanceView: 'summary',
	hideSensitiveAmounts: false,
	setSelectedMonth: (selectedMonth) => set({ selectedMonth }),
	setSelectedFinanceView: (selectedFinanceView) => set({ selectedFinanceView }),
	setHideSensitiveAmounts: (hideSensitiveAmounts) =>
		set({ hideSensitiveAmounts }),
}));

