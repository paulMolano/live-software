import { TrainingProvider } from '../app/TrainingProvider';
import { TrainingRoutes } from './TrainingRoutes';

export function TrainingApp() {
	return (
		<TrainingProvider>
			<TrainingRoutes />
		</TrainingProvider>
	);
}

export default TrainingApp;

