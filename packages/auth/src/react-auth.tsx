import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
	type ReactNode,
} from 'react';
import { OidcPkceClient, type AuthConfig, type TokenSet } from './oidc-client';
import type { AuthUser } from './types';

export type { AuthConfig };

export type AuthStatus =
	| 'loading'
	| 'unauthenticated'
	| 'authenticating'
	| 'authenticated'
	| 'error';

export type AuthContextValue = {
	status: AuthStatus;
	isAuthenticated: boolean;
	user: AuthUser | null;
	roles: string[];
	errorMessage: string | null;
	login: () => Promise<void>;
	logout: () => void;
	getAccessToken: () => string | null;
	hasRole: (role: string) => boolean;
};

type AuthState = {
	status: AuthStatus;
	tokenSet: TokenSet | null;
	errorMessage: string | null;
};

type AuthProviderProps = {
	children: ReactNode;
	config: AuthConfig;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function errorMessageFromUnknown(error: unknown): string {
	return error instanceof Error ? error.message : 'Authentication failed.';
}

export function AuthProvider({ children, config }: AuthProviderProps) {
	const client = useMemo(() => new OidcPkceClient(config), [config]);
	const [state, setState] = useState<AuthState>(() => {
		const storedSession = client.readStoredSession();

		return {
			status:
				client.hasPendingCallback() || client.hasPendingLogin()
					? 'authenticating'
					: storedSession
						? 'loading'
						: 'unauthenticated',
			tokenSet: storedSession,
			errorMessage: null,
		};
	});

	useEffect(() => {
		let active = true;

		async function completeLogin(): Promise<void> {
			try {
				const tokenSet = client.hasPendingCallback()
					? await client.handleRedirectCallback()
					: await client.restoreSession();

				if (!active) {
					return;
				}

				setState({
					status: tokenSet ? 'authenticated' : 'unauthenticated',
					tokenSet,
					errorMessage: null,
				});
			} catch (error) {
				if (!active) {
					return;
				}

				setState({
					status: 'error',
					tokenSet: null,
					errorMessage: errorMessageFromUnknown(error),
				});
			}
		}

		void completeLogin();

		return () => {
			active = false;
		};
	}, [client]);

	useEffect(() => {
		if (state.status !== 'authenticated' || !state.tokenSet?.refreshToken) {
			return undefined;
		}

		let active = true;
		const tokenSet = state.tokenSet;
		const timeoutId = window.setTimeout(() => {
			async function refresh(): Promise<void> {
				const refreshed = await client.refreshSession(tokenSet);

				if (!active) {
					return;
				}

				setState({
					status: refreshed ? 'authenticated' : 'unauthenticated',
					tokenSet: refreshed,
					errorMessage: refreshed ? null : 'Session expired.',
				});
			}

			void refresh();
		}, client.msUntilRefresh(state.tokenSet));

		return () => {
			active = false;
			window.clearTimeout(timeoutId);
		};
	}, [client, state.status, state.tokenSet]);

	const login = useCallback(async () => {
		setState((current) => ({
			...current,
			status: 'authenticating',
			errorMessage: null,
		}));

		await client.startLogin(window.location.href);
	}, [client]);

	const logout = useCallback(() => {
		const idToken = state.tokenSet?.idToken;
		setState({
			status: 'unauthenticated',
			tokenSet: null,
			errorMessage: null,
		});
		client.logout(idToken);
	}, [client, state.tokenSet?.idToken]);

	const getAccessToken = useCallback(
		() => state.tokenSet?.accessToken ?? null,
		[state.tokenSet?.accessToken],
	);

	const roles = state.tokenSet?.user.roles ?? [];

	const value = useMemo<AuthContextValue>(
		() => ({
			status: state.status,
			isAuthenticated: state.status === 'authenticated',
			user: state.tokenSet?.user ?? null,
			roles,
			errorMessage: state.errorMessage,
			login,
			logout,
			getAccessToken,
			hasRole: (role: string) => roles.includes(role),
		}),
		[
			getAccessToken,
			login,
			logout,
			roles,
			state.errorMessage,
			state.status,
			state.tokenSet?.user,
		],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error('useAuth must be used inside AuthProvider.');
	}

	return context;
}

export function usePermissions() {
	const auth = useAuth();

	return {
		roles: auth.roles,
		hasRole: auth.hasRole,
	};
}
