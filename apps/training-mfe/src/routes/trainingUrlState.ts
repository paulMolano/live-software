import { publicRoutes } from '@live-software/contracts';
import {
	trainingRanges,
	trainingViews,
	type TrainingRange,
	type TrainingView,
} from '@live-software/contracts';

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

function isTrainingRange(value: string | null): value is TrainingRange {
	return value !== null && trainingRanges.some((range) => range === value);
}

function isTrainingView(value: string | null): value is TrainingView {
	return value !== null && trainingViews.some((view) => view === value);
}

export function readTrainingUrlState(): TrainingUrlState {
	const params = getTrainingSearchParams();
	const range = params.get('range');
	const view = params.get('view');

	return {
		range: isTrainingRange(range) ? range : undefined,
		view: isTrainingView(view) ? view : undefined,
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

