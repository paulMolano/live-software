import {
	createContext,
	useContext,
	useMemo,
	type ReactNode,
} from 'react';
import {
	defaultAppContext,
	type AppContextValue,
} from '@live-software/contracts';

const AppContext = createContext<AppContextValue | null>(null);

type AppContextProviderProps = {
	children: ReactNode;
	value?: AppContextValue;
};

export function AppContextProvider({
	children,
	value = defaultAppContext,
}: AppContextProviderProps) {
	const contextValue = useMemo(() => value, [value]);

	return (
		<AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
	);
}

export function useAppContext(): AppContextValue {
	const context = useContext(AppContext);

	if (!context) {
		throw new Error('useAppContext must be used inside AppContextProvider.');
	}

	return context;
}

