import { FinanceProvider } from '../app/FinanceProvider';
import { FinanceDashboardCard } from './FinanceDashboardCard';

export function FinanceDashboardWidget() {
	return (
		<FinanceProvider>
			<FinanceDashboardCard />
		</FinanceProvider>
	);
}

export default FinanceDashboardWidget;

