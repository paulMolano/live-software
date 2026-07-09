import { useEffect } from 'react';
import { useFinanceUiStore } from '../state/financeUiStore';
import { FinancePage } from './FinancePage';
import { readFinanceUrlState } from './financeUrlState';

export function FinanceRoutes() {
	const setSelectedMonth = useFinanceUiStore((state) => state.setSelectedMonth);
	const setSelectedFinanceView = useFinanceUiStore(
		(state) => state.setSelectedFinanceView,
	);

	useEffect(() => {
		const applyUrlState = () => {
			const urlState = readFinanceUrlState();

			if (urlState.month) {
				setSelectedMonth(urlState.month);
			}

			if (urlState.view) {
				setSelectedFinanceView(urlState.view);
			}
		};

		applyUrlState();
		window.addEventListener('hashchange', applyUrlState);

		return () => {
			window.removeEventListener('hashchange', applyUrlState);
		};
	}, [setSelectedFinanceView, setSelectedMonth]);

	return <FinancePage />;
}

