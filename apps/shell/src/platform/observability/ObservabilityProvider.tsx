import {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
	type ReactNode,
} from 'react';
import {
	emitObservabilityEntry,
	logPlatformError,
	logPlatformInfo,
	subscribeObservabilityEntries,
	trackPlatformEvent,
	type ObservabilityClient,
	type ObservabilityEntry,
} from '@live-software/contracts';

type ObservabilityFeedContextValue = {
	entries: ObservabilityEntry[];
	clearEntries: () => void;
};

export const shellObservabilityClient: ObservabilityClient = {
	logInfo: (message, context) => {
		console.info(`[shell] ${message}`, context ?? {});
		logPlatformInfo('shell', message, context);
	},
	logError: (error, context) => {
		console.error('[shell] error', error, context ?? {});
		logPlatformError('shell', error, context);
	},
	trackEvent: (name, payload) => {
		console.info(`[shell:event] ${name}`, payload ?? {});
		trackPlatformEvent('shell', name, payload);
	},
};

const ObservabilityClientContext = createContext<ObservabilityClient | null>(null);
const ObservabilityFeedContext =
	createContext<ObservabilityFeedContextValue | null>(null);

type ObservabilityProviderProps = {
	children: ReactNode;
	client?: ObservabilityClient;
};

export function ObservabilityProvider({
	children,
	client = shellObservabilityClient,
}: ObservabilityProviderProps) {
	const [entries, setEntries] = useState<ObservabilityEntry[]>([]);

	useEffect(
		() =>
			subscribeObservabilityEntries((entry) => {
				setEntries((current) => [entry, ...current].slice(0, 20));
			}),
		[],
	);

	useEffect(() => {
		emitObservabilityEntry({
			level: 'info',
			source: 'shell',
			message: 'ObservabilityProvider mounted',
		});
	}, []);

	const feedValue = useMemo<ObservabilityFeedContextValue>(
		() => ({
			entries,
			clearEntries: () => setEntries([]),
		}),
		[entries],
	);

	return (
		<ObservabilityClientContext.Provider value={client}>
			<ObservabilityFeedContext.Provider value={feedValue}>
				{children}
			</ObservabilityFeedContext.Provider>
		</ObservabilityClientContext.Provider>
	);
}

export function useObservability(): ObservabilityClient {
	const context = useContext(ObservabilityClientContext);

	if (!context) {
		throw new Error('useObservability must be used inside ObservabilityProvider.');
	}

	return context;
}

export function useObservabilityFeed(): ObservabilityEntry[] {
	const context = useContext(ObservabilityFeedContext);

	if (!context) {
		throw new Error(
			'useObservabilityFeed must be used inside ObservabilityProvider.',
		);
	}

	return context.entries;
}

export function useClearObservabilityFeed(): () => void {
	const context = useContext(ObservabilityFeedContext);

	if (!context) {
		throw new Error(
			'useClearObservabilityFeed must be used inside ObservabilityProvider.',
		);
	}

	return context.clearEntries;
}
