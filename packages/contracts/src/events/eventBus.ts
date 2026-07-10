import type {
	AppEvent,
	AppEventByType,
	AppEventHandler,
	AppEventType,
} from './appEvents.js';

export type UnsubscribeAppEvent = () => void;

export type AppEventBus = {
	emit: (event: AppEvent) => void;
	subscribe: <TType extends AppEventType>(
		type: TType,
		handler: AppEventHandler<TType>,
	) => UnsubscribeAppEvent;
	unsubscribe: <TType extends AppEventType>(
		type: TType,
		handler: AppEventHandler<TType>,
	) => void;
};

const APP_EVENT_NAME = 'live-software:app-event';
const fallbackTarget = new EventTarget();

type UntypedAppEventHandler = (event: AppEvent) => void;

function getEventTarget(): EventTarget {
	return typeof window === 'undefined' ? fallbackTarget : window;
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null;
}

function hasEventDetail(value: Event): value is Event & { detail: unknown } {
	return 'detail' in value;
}

function isAppEvent(value: unknown): value is AppEvent {
	if (!isRecord(value) || typeof value['type'] !== 'string') {
		return false;
	}

	const eventType = value['type'];
	const payload = value['payload'];

	switch (eventType) {
		case 'training.session.created':
			return (
				isRecord(payload) && typeof payload['sessionId'] === 'string'
			);
		case 'finance.transaction.created':
			return (
				isRecord(payload) && typeof payload['transactionId'] === 'string'
			);
		case 'finance.debt.updated':
			return isRecord(payload) && typeof payload['debtId'] === 'string';
		case 'platform.remote.error':
			return (
				isRecord(payload) &&
				typeof payload['remoteName'] === 'string' &&
				typeof payload['message'] === 'string'
			);
		default:
			return false;
	}
}

function createEvent(event: AppEvent): Event {
	if (typeof CustomEvent === 'function') {
		return new CustomEvent<AppEvent>(APP_EVENT_NAME, { detail: event });
	}

	const fallbackEvent = new Event(APP_EVENT_NAME);
	Object.defineProperty(fallbackEvent, 'detail', {
		value: event,
		configurable: true,
		enumerable: true,
	});
	return fallbackEvent;
}

function readAppEvent(event: Event): AppEvent | null {
	const detail = hasEventDetail(event) ? event.detail : null;
	return isAppEvent(detail) ? detail : null;
}

function isEventOfType<TType extends AppEventType>(
	event: AppEvent,
	type: TType,
): event is AppEventByType<TType> {
	return event.type === type;
}

export function createAppEventBus(): AppEventBus {
	const listeners = new Map<
		AppEventType,
		Map<Function, EventListener>
	>();

	const unsubscribe = <TType extends AppEventType>(
		type: TType,
		handler: AppEventHandler<TType>,
	) => {
		const handlersForType = listeners.get(type);
		const listener = handlersForType?.get(handler);

		if (!listener) {
			return;
		}

		getEventTarget().removeEventListener(APP_EVENT_NAME, listener);
		handlersForType?.delete(handler);

		if (handlersForType?.size === 0) {
			listeners.delete(type);
		}
	};

	return {
		emit: (event) => {
			getEventTarget().dispatchEvent(createEvent(event));
		},
		subscribe: <TType extends AppEventType>(
			type: TType,
			handler: AppEventHandler<TType>,
		) => {
			unsubscribe(type, handler);

			const listener: EventListener = (domEvent) => {
				const appEvent = readAppEvent(domEvent);

				if (appEvent && isEventOfType(appEvent, type)) {
					handler(appEvent);
				}
			};
			const handlersForType = listeners.get(type) ?? new Map();

			handlersForType.set(handler, listener);
			listeners.set(type, handlersForType);
			getEventTarget().addEventListener(APP_EVENT_NAME, listener);

			return () => unsubscribe(type, handler);
		},
		unsubscribe,
	};
}

export const appEventBus = createAppEventBus();
