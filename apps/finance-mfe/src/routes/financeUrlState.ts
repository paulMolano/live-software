import { publicRoutes } from '@live-software/contracts';
import { financeViews, type FinanceView } from '@live-software/contracts';

export type FinanceUrlState = {
	month?: string;
	view?: FinanceView;
};

function getFinanceSearchParams(): URLSearchParams {
	const hashPath = window.location.hash.startsWith('#')
		? window.location.hash.slice(1)
		: window.location.hash;
	const query = hashPath.split('?')[1] ?? '';

	return new URLSearchParams(query);
}

function isMonth(value: string | null): value is string {
	return value !== null && /^\d{4}-\d{2}$/.test(value);
}

function isFinanceView(value: string | null): value is FinanceView {
	return value !== null && financeViews.some((view) => view === value);
}

export function readFinanceUrlState(): FinanceUrlState {
	const params = getFinanceSearchParams();
	const month = params.get('month');
	const view = params.get('view');

	return {
		month: isMonth(month) ? month : undefined,
		view: isFinanceView(view) ? view : undefined,
	};
}

export function writeFinanceUrlState(state: Required<FinanceUrlState>) {
	const params = new URLSearchParams();
	params.set('month', state.month);
	params.set('view', state.view);
	window.history.replaceState(
		null,
		'',
		`#${publicRoutes.finance}?${params.toString()}`,
	);
}

