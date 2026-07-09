import type { FinanceView } from '@live-software/contracts';
export type FinanceUrlState = {
    month?: string;
    view?: FinanceView;
};
export declare function readFinanceUrlState(): FinanceUrlState;
export declare function writeFinanceUrlState(state: Required<FinanceUrlState>): void;
