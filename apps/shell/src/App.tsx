import {
	useEffect,
	useMemo,
	useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useMantineColorScheme } from '@mantine/core';
import { useAuth, type AuthStatus } from '@live-software/auth';
import {
	publicRoutes,
	type FeatureFlagKey,
	type PermissionKey,
	type PublicRoutePath,
} from '@live-software/contracts';
import { getShellApiBaseUrl } from './auth-runtime-config';
import { RemoteWidgetBoundary } from './components/RemoteWidgetBoundary';
import { lazyProvider } from './mf';
import { DashboardPage } from './pages/DashboardPage';
import { useAppContext } from './platform/appContext/AppContext';
import { useFeatureFlags } from './platform/feature-flags/FeatureFlagsProvider';
import { useNavigation } from './platform/navigation/NavigationProvider';
import { usePlatformPermissions } from './platform/permissions/PermissionsProvider';
import { useUiStore, type DashboardLayoutMode } from './state/ui-store';
import * as styles from './App.module.css';

const TrainingApp = lazyProvider('training-mfe', 'TrainingApp');
const FinanceApp = lazyProvider('finance-mfe', 'FinanceApp');

type AppRoute = 'dashboard' | 'training' | 'finance';
type ColorSchemeValue = 'light' | 'dark' | 'auto';

type RouteDefinition = {
	flag?: FeatureFlagKey;
	labelKey: string;
	path: PublicRoutePath;
	permission: PermissionKey;
	route: AppRoute;
};

const routeDefinitions: readonly RouteDefinition[] = [
	{
		labelKey: 'navDashboard',
		path: publicRoutes.dashboard,
		permission: 'dashboard:view',
		route: 'dashboard',
	},
	{
		flag: 'training-mfe',
		labelKey: 'navTraining',
		path: publicRoutes.training,
		permission: 'training:view',
		route: 'training',
	},
	{
		flag: 'finance-mfe',
		labelKey: 'navFinance',
		path: publicRoutes.finance,
		permission: 'finance:view',
		route: 'finance',
	},
];

function getPathFromHash(hash: string): string {
	const path = hash.startsWith('#') ? hash.slice(1) : hash;
	return path || publicRoutes.dashboard;
}

function getRouteFromHash(hash: string): AppRoute {
	const path = getPathFromHash(hash);

	if (path.startsWith(publicRoutes.training)) {
		return 'training';
	}

	if (path.startsWith(publicRoutes.finance)) {
		return 'finance';
	}

	return 'dashboard';
}

function ThemeControls() {
	const { t } = useTranslation();
	const { colorScheme, setColorScheme } = useMantineColorScheme();

	const options = useMemo(
		(): ReadonlyArray<{ value: ColorSchemeValue; label: string }> => [
			{ value: 'light', label: t('themeLight') },
			{ value: 'dark', label: t('themeDark') },
			{ value: 'auto', label: t('themeAuto') },
		],
		[t],
	);

	return (
		<section className={styles.controlGroup} aria-label={t('themeLabel')}>
			<span className={styles.controlLabel}>{t('themeLabel')}:</span>
			{options.map((option) => {
				const isActive = colorScheme === option.value;
				return (
					<button
						key={option.value}
						type="button"
						className={`${styles.controlButton} ${
							isActive ? styles.controlButtonActive : ''
						}`}
						onClick={() => setColorScheme(option.value)}
						aria-pressed={isActive}
					>
						{option.label}
					</button>
				);
			})}
		</section>
	);
}

function LanguageControls() {
	const { t, i18n } = useTranslation();

	return (
		<section className={styles.controlGroup} aria-label={t('languageLabel')}>
			<label className={styles.controlLabel} htmlFor="language-select">
				{t('languageLabel')}:
			</label>
			<select
				id="language-select"
				className={styles.controlSelect}
				value={i18n.language}
				onChange={(event) => {
					void i18n.changeLanguage(event.currentTarget.value);
				}}
			>
				<option value="es-ES">{t('languageEs')}</option>
				<option value="en-US">{t('languageEn')}</option>
			</select>
		</section>
	);
}

function UiPreferencesControls() {
	const { t } = useTranslation();
	const sidebarOpen = useUiStore((state) => state.sidebarOpen);
	const dashboardLayoutMode = useUiStore((state) => state.dashboardLayoutMode);
	const toggleSidebar = useUiStore((state) => state.toggleSidebar);
	const setDashboardLayoutMode = useUiStore(
		(state) => state.setDashboardLayoutMode,
	);

	const dashboardLayoutModes: readonly DashboardLayoutMode[] = ['stacked', 'split'];

	const isDashboardLayoutMode = (value: string): value is DashboardLayoutMode => {
		return dashboardLayoutModes.some((mode) => mode === value);
	};

	return (
		<section className={styles.controlGroup} aria-label={t('uiStateLabel')}>
			<span className={styles.controlLabel}>{t('uiStateLabel')}:</span>
			<button
				type="button"
				className={styles.controlButton}
				aria-pressed={sidebarOpen}
				onClick={toggleSidebar}
			>
				{sidebarOpen ? t('sidebarOpen') : t('sidebarClosed')}
			</button>
			<label className={styles.controlLabel} htmlFor="dashboard-layout-mode">
				{t('dashboardLayoutLabel')}:
			</label>
			<select
				id="dashboard-layout-mode"
				className={styles.controlSelect}
				value={dashboardLayoutMode}
				onChange={(event) => {
					const { value } = event.currentTarget;

					if (isDashboardLayoutMode(value)) {
						setDashboardLayoutMode(value);
					}
				}}
			>
				<option value="stacked">{t('layoutStacked')}</option>
				<option value="split">{t('layoutSplit')}</option>
			</select>
		</section>
	);
}

type ProtectedApiState =
	| 'idle'
	| 'loading'
	| 'success'
	| 'unauthorized'
	| 'forbidden'
	| 'error';

function authStatusLabel(status: AuthStatus, t: (key: string) => string): string {
	switch (status) {
		case 'loading':
			return t('authLoading');
		case 'authenticating':
			return t('authAuthenticating');
		case 'authenticated':
			return t('authAuthenticated');
		case 'error':
			return t('authError');
		case 'unauthenticated':
			return t('authUnauthenticated');
	}
}

function protectedApiStatusLabel(
	status: ProtectedApiState,
	t: (key: string) => string,
): string {
	switch (status) {
		case 'idle':
			return t('authProtectedIdle');
		case 'loading':
			return t('authProtectedLoading');
		case 'success':
			return t('authProtectedSuccess');
		case 'unauthorized':
			return t('authProtectedUnauthorized');
		case 'forbidden':
			return t('authProtectedForbidden');
		case 'error':
			return t('authProtectedError');
	}
}

function AuthControls() {
	const { t } = useTranslation();
	const auth = useAuth();
	const [protectedApiState, setProtectedApiState] =
		useState<ProtectedApiState>('idle');

	const checkProtectedApi = async () => {
		setProtectedApiState('loading');

		try {
			const accessToken = auth.getAccessToken();
			const response = await fetch(`${getShellApiBaseUrl()}/api/auth/session`, {
				headers: accessToken
					? {
							Authorization: `Bearer ${accessToken}`,
						}
					: {},
			});

			if (response.ok) {
				setProtectedApiState('success');
				return;
			}

			if (response.status === 401) {
				setProtectedApiState('unauthorized');
				return;
			}

			if (response.status === 403) {
				setProtectedApiState('forbidden');
				return;
			}

			setProtectedApiState('error');
		} catch {
			setProtectedApiState('error');
		}
	};

	const busy = auth.status === 'loading' || auth.status === 'authenticating';
	const statusText = authStatusLabel(auth.status, t);
	const protectedApiText = protectedApiStatusLabel(protectedApiState, t);
	const statusClassName =
		auth.status === 'error' || protectedApiState === 'error'
			? styles.dangerText
			: auth.isAuthenticated || protectedApiState === 'success'
				? styles.successText
				: undefined;

	return (
		<section className={styles.controlGroup} aria-label={t('authLabel')}>
			<span className={styles.controlLabel}>{t('authStatus')}:</span>
			<span className={statusClassName}>{statusText}</span>
			{auth.user ? (
				<span>
					{t('authUserLabel')}:{' '}
					{auth.user.name ?? auth.user.username ?? auth.user.id}
				</span>
			) : null}
			<button
				type="button"
				className={styles.controlButton}
				onClick={() => void auth.login()}
				disabled={busy || auth.isAuthenticated}
			>
				{t('authLogin')}
			</button>
			<button
				type="button"
				className={styles.controlButton}
				onClick={auth.logout}
				disabled={busy || !auth.isAuthenticated}
			>
				{t('authLogout')}
			</button>
			<button
				type="button"
				className={styles.controlButton}
				onClick={() => void checkProtectedApi()}
				disabled={protectedApiState === 'loading'}
			>
				{t('authProtectedCheck')}
			</button>
			<span className={statusClassName}>{protectedApiText}</span>
			{auth.errorMessage ? (
				<span className={styles.dangerText}>{auth.errorMessage}</span>
			) : null}
		</section>
	);
}

function RouteNotice({
	title,
	message,
}: {
	title: string;
	message: string;
}) {
	return (
		<section className={styles.routeNotice} role="status">
			<h2 className={styles.sectionTitle}>{title}</h2>
			<p>{message}</p>
		</section>
	);
}

export function App() {
	const { t } = useTranslation();
	const appContext = useAppContext();
	const navigation = useNavigation();
	const featureFlags = useFeatureFlags();
	const permissions = usePlatformPermissions();
	const [route, setRoute] = useState<AppRoute>(() =>
		getRouteFromHash(window.location.hash),
	);

	useEffect(() => {
		const onHashChange = () => {
			setRoute(getRouteFromHash(window.location.hash));
		};

		window.addEventListener('hashchange', onHashChange);
		return () => {
			window.removeEventListener('hashchange', onHashChange);
		};
	}, []);

	const navItems = routeDefinitions.filter(
		(routeDefinition) =>
			!routeDefinition.flag || featureFlags.isEnabled(routeDefinition.flag),
	);
	const currentRouteDefinition =
		routeDefinitions.find((routeDefinition) => routeDefinition.route === route) ??
		{
			labelKey: 'navDashboard',
			path: publicRoutes.dashboard,
			permission: 'dashboard:view',
			route: 'dashboard',
		};
	const hasPermission = permissions.hasPermission(
		currentRouteDefinition.permission,
	);

	const routeContent = useMemo(() => {
		if (!hasPermission) {
			return (
				<RouteNotice
					title={t('forbiddenTitle')}
					message={t('forbiddenBody')}
				/>
			);
		}

		if (route === 'training' && !featureFlags.isEnabled('training-mfe')) {
			return (
				<RouteNotice
					title={t('featureDisabledTitle')}
					message={t('featureDisabledBody')}
				/>
			);
		}

		if (route === 'finance' && !featureFlags.isEnabled('finance-mfe')) {
			return (
				<RouteNotice
					title={t('featureDisabledTitle')}
					message={t('featureDisabledBody')}
				/>
			);
		}

		switch (route) {
			case 'training':
				return (
					<RemoteWidgetBoundary
						name="training-mfe"
						fallback={
							<p role="status">
								{t('loadingRemote', { name: 'training-mfe' })}
							</p>
						}
					>
						<TrainingApp />
					</RemoteWidgetBoundary>
				);
			case 'finance':
				return (
					<RemoteWidgetBoundary
						name="finance-mfe"
						fallback={
							<p role="status">
								{t('loadingRemote', { name: 'finance-mfe' })}
							</p>
						}
					>
						<FinanceApp />
					</RemoteWidgetBoundary>
				);
			case 'dashboard':
				return <DashboardPage />;
		}
	}, [featureFlags, hasPermission, route, t]);

	return (
		<div className={styles.page}>
			<a className={styles.skipLink} href="#main-content">
				{t('skipToMain')}
			</a>

			<header className={styles.header}>
				<div className={styles.headerInner}>
					<h1>{appContext.appName}</h1>
					<nav className={styles.nav} aria-label="Global">
						{navItems.map((navItem) => {
							const isActive = route === navItem.route;

							return (
								<a
									key={navItem.route}
									className={`${styles.navLink} ${
										isActive ? styles.navLinkActive : ''
									}`}
									href={navigation.createHref(navItem.path)}
									aria-current={isActive ? 'page' : undefined}
								>
									{t(navItem.labelKey)}
								</a>
							);
						})}
					</nav>

					<div className={styles.controls}>
						<UiPreferencesControls />
						<ThemeControls />
						<LanguageControls />
						<AuthControls />
					</div>
				</div>
			</header>

			<main id="main-content" className={styles.main}>
				{routeContent}
			</main>
		</div>
	);
}

export default App;
