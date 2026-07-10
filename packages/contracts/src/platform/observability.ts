export type ObservabilityContext = Record<string, unknown>;

export type ObservabilityLevel = 'info' | 'event' | 'error';

export type ObservabilityEntry = {
	id: string;
	level: ObservabilityLevel;
	message: string;
	source: string;
	context?: ObservabilityContext;
	occurredAtIso: string;
};

export type ObservabilityEntryInput = Omit<
	ObservabilityEntry,
	'id' | 'occurredAtIso'
> & {
	id?: string;
	occurredAtIso?: string;
};

export type ObservabilityClient = {
	logInfo: (message: string, context?: ObservabilityContext) => void;
	logError: (error: unknown, context?: ObservabilityContext) => void;
	trackEvent: (name: string, payload?: ObservabilityContext) => void;
};

export type ObservabilityEntryHandler = (entry: ObservabilityEntry) => void;

const OBSERVABILITY_EVENT_NAME = 'live-software:observability-entry';
const fallbackTarget = new EventTarget();
let entryCounter = 0;

function getEventTarget(): EventTarget {
	return typeof window === 'undefined' ? fallbackTarget : window;
}

function hasEventDetail(value: Event): value is Event & { detail: unknown } {
	return 'detail' in value;
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null;
}

function isObservabilityEntry(value: unknown): value is ObservabilityEntry {
	if (!isRecord(value)) {
		return false;
	}

	return (
		typeof value.id === 'string' &&
		(value.level === 'info' || value.level === 'event' || value.level === 'error') &&
		typeof value.message === 'string' &&
		typeof value.source === 'string' &&
		typeof value.occurredAtIso === 'string'
	);
}

function createEvent(entry: ObservabilityEntry): Event {
	if (typeof CustomEvent === 'function') {
		return new CustomEvent<ObservabilityEntry>(OBSERVABILITY_EVENT_NAME, {
			detail: entry,
		});
	}

	const fallbackEvent = new Event(OBSERVABILITY_EVENT_NAME);
	Object.defineProperty(fallbackEvent, 'detail', {
		value: entry,
		configurable: true,
		enumerable: true,
	});
	return fallbackEvent;
}

function toErrorMessage(error: unknown): string {
	return error instanceof Error ? error.message : String(error);
}

export function emitObservabilityEntry(
	input: ObservabilityEntryInput,
): ObservabilityEntry {
	entryCounter += 1;
	const entry: ObservabilityEntry = {
		id: input.id ?? `${Date.now()}-${entryCounter}`,
		level: input.level,
		message: input.message,
		source: input.source,
		occurredAtIso: input.occurredAtIso ?? new Date().toISOString(),
	};

	if (input.context) {
		entry.context = input.context;
	}

	getEventTarget().dispatchEvent(createEvent(entry));
	return entry;
}

export function subscribeObservabilityEntries(
	handler: ObservabilityEntryHandler,
): () => void {
	const listener: EventListener = (event) => {
		const detail = hasEventDetail(event) ? event.detail : null;

		if (isObservabilityEntry(detail)) {
			handler(detail);
		}
	};

	getEventTarget().addEventListener(OBSERVABILITY_EVENT_NAME, listener);

	return () => {
		getEventTarget().removeEventListener(OBSERVABILITY_EVENT_NAME, listener);
	};
}

export function logPlatformInfo(
	source: string,
	message: string,
	context?: ObservabilityContext,
): void {
	const entry: ObservabilityEntryInput = {
		level: 'info',
		source,
		message,
	};

	if (context) {
		entry.context = context;
	}

	emitObservabilityEntry(entry);
}

export function trackPlatformEvent(
	source: string,
	name: string,
	context?: ObservabilityContext,
): void {
	const entry: ObservabilityEntryInput = {
		level: 'event',
		source,
		message: name,
	};

	if (context) {
		entry.context = context;
	}

	emitObservabilityEntry(entry);
}

export function logPlatformError(
	source: string,
	error: unknown,
	context?: ObservabilityContext,
): void {
	const entry: ObservabilityEntryInput = {
		level: 'error',
		source,
		message: toErrorMessage(error),
	};

	if (context) {
		entry.context = context;
	}

	emitObservabilityEntry(entry);
}
