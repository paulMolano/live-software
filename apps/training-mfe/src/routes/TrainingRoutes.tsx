import { useEffect } from 'react';
import { useTrainingUiStore } from '../state/trainingUiStore';
import { TrainingPage } from './TrainingPage';
import { readTrainingUrlState } from './trainingUrlState';

export function TrainingRoutes() {
	const setSelectedRange = useTrainingUiStore((state) => state.setSelectedRange);
	const setActiveView = useTrainingUiStore((state) => state.setActiveView);

	useEffect(() => {
		const applyUrlState = () => {
			const urlState = readTrainingUrlState();

			if (urlState.range) {
				setSelectedRange(urlState.range);
			}

			if (urlState.view) {
				setActiveView(urlState.view);
			}
		};

		applyUrlState();
		window.addEventListener('hashchange', applyUrlState);

		return () => {
			window.removeEventListener('hashchange', applyUrlState);
		};
	}, [setActiveView, setSelectedRange]);

	return <TrainingPage />;
}

