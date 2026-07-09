import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
	type ReactNode,
} from 'react';
import {
	appEventBus,
	type AppEvent,
	type AppEventBus,
	type AppEventType,
} from '@live-software/contracts';
import { useObservability } from '../observability/ObservabilityProvider';

export type RecentAppEvent = {
	id: string;
	event: AppEvent;
	occurredAtIso: string;
	label: string;
};

type EventBusContextValue = {
	eventBus: AppEventBus;
	recentEvents: RecentAppEvent[];
};

const EventBusContext = createContext<EventBusContextValue | null>(null);

const observedEventTypes = [
	'training.session.created',
	'finance.transaction.created',
	'finance.debt.updated',
	'platform.remote.error',
] as const satisfies readonly AppEventType[];

function labelAppEvent(event: AppEvent): string {
	switch (event.type) {
		case 'training.session.created':
			return `Training session ${event.payload.sessionId} created`;
		case 'finance.transaction.created':
			return `Finance transaction ${event.payload.transactionId} created`;
		case 'finance.debt.updated':
			return `Finance debt ${event.payload.debtId} updated`;
		case 'platform.remote.error':
			return `${event.payload.remoteName} failed: ${event.payload.message}`;
	}
}

type EventBusProviderProps = {
	children: ReactNode;
	eventBus?: AppEventBus;
};

export function EventBusProvider({
	children,
	eventBus = appEventBus,
}: EventBusProviderProps) {
	const { logInfo, trackEvent } = useObservability();
	const [recentEvents, setRecentEvents] = useState<RecentAppEvent[]>([]);
	const eventCounter = useRef(0);

	const recordEvent = useCallback(
		(event: AppEvent) => {
			eventCounter.current += 1;
			logInfo('App event received', { type: event.type });
			trackEvent(event.type, event.payload);

			setRecentEvents((current) =>
				[
					{
						id: `${Date.now()}-${eventCounter.current}`,
						event,
						occurredAtIso: new Date().toISOString(),
						label: labelAppEvent(event),
					},
					...current,
				].slice(0, 5),
			);
		},
		[logInfo, trackEvent],
	);

	useEffect(() => {
		const unsubscribes = observedEventTypes.map((eventType) =>
			eventBus.subscribe(eventType, recordEvent),
		);

		return () => {
			unsubscribes.forEach((unsubscribe) => unsubscribe());
		};
	}, [eventBus, recordEvent]);

	const value = useMemo<EventBusContextValue>(
		() => ({ eventBus, recentEvents }),
		[eventBus, recentEvents],
	);

	return (
		<EventBusContext.Provider value={value}>
			{children}
		</EventBusContext.Provider>
	);
}

export function useEventBus(): AppEventBus {
	const context = useContext(EventBusContext);

	if (!context) {
		throw new Error('useEventBus must be used inside EventBusProvider.');
	}

	return context.eventBus;
}

export function useRecentAppEvents(): RecentAppEvent[] {
	const context = useContext(EventBusContext);

	if (!context) {
		throw new Error('useRecentAppEvents must be used inside EventBusProvider.');
	}

	return context.recentEvents;
}
