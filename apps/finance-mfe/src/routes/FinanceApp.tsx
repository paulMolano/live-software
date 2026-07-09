import { FinanceProvider } from '../app/FinanceProvider';
import { FinanceRoutes } from './FinanceRoutes';

export function FinanceApp() {
	return (
		<FinanceProvider>
			<FinanceRoutes />
		</FinanceProvider>
	);
}

export default FinanceApp;

