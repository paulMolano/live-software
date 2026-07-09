import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	type ReactNode,
} from 'react';
import { publicRoutes, type PublicRoutePath } from '@live-software/contracts';

type NavigationContextValue = {
	routes: typeof publicRoutes;
	createHref: (path: PublicRoutePath) => string;
	navigateTo: (path: PublicRoutePath) => void;
};

const NavigationContext = createContext<NavigationContextValue | null>(null);

type NavigationProviderProps = {
	children: ReactNode;
};

export function NavigationProvider({ children }: NavigationProviderProps) {
	const createHref = useCallback((path: PublicRoutePath) => `#${path}`, []);
	const navigateTo = useCallback((path: PublicRoutePath) => {
		window.location.hash = path;
	}, []);

	const value = useMemo<NavigationContextValue>(
		() => ({
			routes: publicRoutes,
			createHref,
			navigateTo,
		}),
		[createHref, navigateTo],
	);

	return (
		<NavigationContext.Provider value={value}>
			{children}
		</NavigationContext.Provider>
	);
}

export function useNavigation(): NavigationContextValue {
	const context = useContext(NavigationContext);

	if (!context) {
		throw new Error('useNavigation must be used inside NavigationProvider.');
	}

	return context;
}

