import type { FinanceView } from '@live-software/contracts';
type FinanceUiState = {
    selectedMonth: string;
    selectedFinanceView: FinanceView;
    hideSensitiveAmounts: boolean;
    setSelectedMonth: (month: string) => void;
    setSelectedFinanceView: (view: FinanceView) => void;
    setHideSensitiveAmounts: (value: boolean) => void;
};
export declare const useFinanceUiStore: import("zustand").UseBoundStore<import("zustand").StoreApi<FinanceUiState>>;
export {};
