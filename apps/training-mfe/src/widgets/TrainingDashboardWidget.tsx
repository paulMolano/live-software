import { TrainingProvider } from '../app/TrainingProvider';
import { TrainingDashboardCard } from './TrainingDashboardCard';

export function TrainingDashboardWidget() {
	return (
		<TrainingProvider>
			<TrainingDashboardCard />
		</TrainingProvider>
	);
}

export default TrainingDashboardWidget;

