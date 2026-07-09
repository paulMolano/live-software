import { Suspense, type ReactNode } from 'react';
import { WidgetErrorBoundary } from './WidgetErrorBoundary';

type RemoteWidgetBoundaryProps = {
	children: ReactNode;
	name: string;
	fallback?: ReactNode;
};

export function RemoteWidgetBoundary({
	children,
	name,
	fallback = <p role="status">Cargando {name}...</p>,
}: RemoteWidgetBoundaryProps) {
	return (
		<WidgetErrorBoundary name={name}>
			<Suspense fallback={fallback}>{children}</Suspense>
		</WidgetErrorBoundary>
	);
}

