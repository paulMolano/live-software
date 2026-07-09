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

type ObservabilityContextValue = ObservabilityClient & {
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

const ObservabilityContext = createContext<ObservabilityContextValue | null>(null);

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

	const value = useMemo<ObservabilityContextValue>(
		() => ({
			...client,
			entries,
			clearEntries: () => setEntries([]),
		}),
		[client, entries],
	);

	return (
		<ObservabilityContext.Provider value={value}>
			{children}
		</ObservabilityContext.Provider>
	);
}

export function useObservability(): ObservabilityContextValue {
	const context = useContext(ObservabilityContext);

	if (!context) {
		throw new Error('useObservability must be used inside ObservabilityProvider.');
	}

	return context;
}

export function useObservabilityFeed(): ObservabilityEntry[] {
	return useObservability().entries;
}
