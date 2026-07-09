import {
	Component,
	type ErrorInfo,
	type ReactNode,
} from 'react';
import { appEventBus } from '@live-software/contracts';
import { shellObservabilityClient } from '../platform/observability/ObservabilityProvider';
import * as styles from './WidgetErrorBoundary.module.css';

type WidgetErrorBoundaryProps = {
	children: ReactNode;
	name: string;
};

type WidgetErrorBoundaryState = {
	error: Error | null;
};

export class WidgetErrorBoundary extends Component<
	WidgetErrorBoundaryProps,
	WidgetErrorBoundaryState
> {
	override state: WidgetErrorBoundaryState = {
		error: null,
	};

	static getDerivedStateFromError(error: Error): WidgetErrorBoundaryState {
		return { error };
	}

	override componentDidCatch(error: Error, info: ErrorInfo) {
		shellObservabilityClient.logError(error, {
			componentStack: info.componentStack,
			widgetName: this.props.name,
		});
		appEventBus.emit({
			type: 'platform.remote.error',
			payload: {
				remoteName: this.props.name,
				message: error.message,
			},
		});
	}

	override render() {
		if (this.state.error) {
			return (
				<section className={styles.errorPanel} role="alert">
					<h3 className={styles.title}>{this.props.name}</h3>
					<p className={styles.message}>
						No se pudo cargar este bloque. El resto del dashboard sigue
						disponible.
					</p>
					<button
						type="button"
						className={styles.retryButton}
						onClick={() => this.setState({ error: null })}
					>
						Reintentar
					</button>
				</section>
			);
		}

		return this.props.children;
	}
}

