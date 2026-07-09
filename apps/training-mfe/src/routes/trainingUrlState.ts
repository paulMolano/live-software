import { publicRoutes } from '@live-software/contracts';
import type { TrainingRange, TrainingView } from '@live-software/contracts';

const validRanges: readonly TrainingRange[] = ['7d', '30d', '90d'];
const validViews: readonly TrainingView[] = ['summary', 'sessions', 'progress'];

export type TrainingUrlState = {
	range?: TrainingRange;
	view?: TrainingView;
};

function getTrainingSearchParams(): URLSearchParams {
	const hashPath = window.location.hash.startsWith('#')
		? window.location.hash.slice(1)
		: window.location.hash;
	const query = hashPath.split('?')[1] ?? '';

	return new URLSearchParams(query);
}

export function readTrainingUrlState(): TrainingUrlState {
	const params = getTrainingSearchParams();
	const range = params.get('range');
	const view = params.get('view');

	return {
		range: validRanges.includes(range as TrainingRange)
			? (range as TrainingRange)
			: undefined,
		view: validViews.includes(view as TrainingView)
			? (view as TrainingView)
			: undefined,
	};
}

export function writeTrainingUrlState(state: Required<TrainingUrlState>) {
	const params = new URLSearchParams();
	params.set('range', state.range);
	params.set('view', state.view);
	window.history.replaceState(
		null,
		'',
		`#${publicRoutes.training}?${params.toString()}`,
	);
}

