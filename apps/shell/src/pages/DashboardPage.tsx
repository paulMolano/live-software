import { useEffect, useState, type ReactElement, type ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useMantineColorScheme } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@live-software/auth';
import {
	publicRoutes,
	type FeatureFlagKey,
	type PlatformPermissions,
} from '@live-software/contracts';
import { DashboardGrid } from '../components/DashboardGrid';
import { RemoteWidgetBoundary } from '../components/RemoteWidgetBoundary';
import { lazyProvider } from '../mf';
import { useAppContext } from '../platform/appContext/AppContext';
import { useRecentAppEvents } from '../platform/event-bus/EventBusProvider';
import { useFeatureFlags } from '../platform/feature-flags/FeatureFlagsProvider';
import { useNavigation } from '../platform/navigation/NavigationProvider';
import {
	useObservability,
	useObservabilityFeed,
} from '../platform/observability/ObservabilityProvider';
import { usePlatformPermissions } from '../platform/permissions/PermissionsProvider';
import { getPlatformAppConfig } from '../platform/query/platformAppConfig';
import * as styles from './DashboardPage.module.css';

const TrainingDashboardWidget = lazyProvider(
	'training-mfe',
	'TrainingDashboardWidget',
);
const FinanceDashboardWidget = lazyProvider(
	'finance-mfe',
	'FinanceDashboardWidget',
);

const featureFlagLabels: Array<{ key: FeatureFlagKey; label: string }> = [
	{ key: 'training-mfe', label: 'Mount training remote' },
	{ key: 'finance-mfe', label: 'Mount finance remote' },
	{ key: 'dashboard-event-feed', label: 'Show event feed' },
	{
		key: 'enableTrainingSessionCreation',
		label: 'Enable training session creation',
	},
	{
		key: 'showTrainingProgressWidget',
		label: 'Show training progress section',
	},
	{ key: 'enableFinanceTransactions', label: 'Enable finance transactions' },
	{ key: 'showFinanceDebtWidget', label: 'Show finance debt section' },
	{
		key: 'showDashboardAggregatePlaceholder',
		label: 'Show dashboard aggregate placeholder',
	},
];

function formatTime(value: string, locale: string): string {
	return new Intl.DateTimeFormat(locale, {
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
	}).format(new Date(value));
}

function formatMoney(value: number, locale: string): string {
	return new Intl.NumberFormat(locale, {
		style: 'currency',
		currency: 'EUR',
	}).format(value);
}

function VerificationPanel({
	children,
	title,
}: {
	children: ReactNode;
	title: string;
}) {
	return (
		<section className={styles.panel} aria-labelledby={`${title}-title`}>
			<h3 id={`${title}-title`} className={styles.panelTitle}>
				{title}
			</h3>
			{children}
		</section>
	);
}

function DemoWidgetError({ name }: { name: string }): ReactElement {
	throw new Error(`${name} widget demo error`);
}

function booleanLabel(value: boolean): string {
	return value ? 'true' : 'false';
}

export function DashboardPage() {
	const { t, i18n } = useTranslation();
	const auth = useAuth();
	const appContext = useAppContext();
	const navigation = useNavigation();
	const featureFlags = useFeatureFlags();
	const permissions = usePlatformPermissions();
	const { logInfo, trackEvent } = useObservability();
	const observabilityEntries = useObservabilityFeed();
	const recentEvents = useRecentAppEvents();
	const { colorScheme, setColorScheme } = useMantineColorScheme();
	const [trainingWidgetError, setTrainingWidgetError] = useState(false);
	const [financeWidgetError, setFinanceWidgetError] = useState(false);
	const [widgetResetCount, setWidgetResetCount] = useState(0);

	const platformConfigQuery = useQuery({
		queryKey: ['app', 'platform', 'config'] as const,
		queryFn: getPlatformAppConfig,
	});

	useEffect(() => {
		logInfo('Dashboard mounted', {
			route: publicRoutes.dashboard,
		});
	}, [logInfo]);

	useEffect(() => {
		if (platformConfigQuery.data) {
			logInfo('Platform app config loaded', {
				fetchCount: platformConfigQuery.data.debug.fetchCount,
			});
		}
	}, [logInfo, platformConfigQuery.data]);

	const toggleTheme = () => {
		const nextTheme = colorScheme === 'dark' ? 'light' : 'dark';
		setColorScheme(nextTheme);
		trackEvent('theme.toggled', { nextTheme });
	};

	const switchLocale = () => {
		const nextLocale = i18n.language === 'en-US' ? 'es-ES' : 'en-US';
		void i18n.changeLanguage(nextLocale);
		trackEvent('locale.switched', { nextLocale });
	};

	const resetWidgetErrors = () => {
		setTrainingWidgetError(false);
		setFinanceWidgetError(false);
		setWidgetResetCount((current) => current + 1);
		logInfo('Widget demo errors reset');
	};

	const navigateAndLog = (path: typeof publicRoutes.dashboard) => {
		trackEvent('navigation.clicked', { path });
		navigation.navigateTo(path);
	};

	const locale = i18n.language === 'en-US' ? 'en-US' : 'es-ES';

	return (
		<section className={styles.page} aria-labelledby="dashboard-title">
			<header className={styles.header}>
				<h2 id="dashboard-title" className={styles.title}>
					{t('dashboardTitle')}
				</h2>
				<p className={styles.subtitle}>
					{t('dashboardSubtitle', {
						name: appContext.userDisplayName,
						range: appContext.defaultDashboardRange,
					})}
				</p>
			</header>

			<div className={styles.panelGrid}>
				<VerificationPanel title="Platform Context">
					<dl className={styles.definitionList}>
						<div>
							<dt>appName</dt>
							<dd>{appContext.appName}</dd>
						</div>
						<div>
							<dt>userId</dt>
							<dd>{appContext.userId}</dd>
						</div>
						<div>
							<dt>userDisplayName</dt>
							<dd>{appContext.userDisplayName}</dd>
						</div>
						<div>
							<dt>preferredLocale</dt>
							<dd>{appContext.preferredLocale}</dd>
						</div>
						<div>
							<dt>defaultDashboardRange</dt>
							<dd>{appContext.defaultDashboardRange}</dd>
						</div>
						<div>
							<dt>currency</dt>
							<dd>{appContext.currency}</dd>
						</div>
						<div>
							<dt>auth.status</dt>
							<dd>{auth.isAuthenticated ? 'authenticated' : auth.status}</dd>
						</div>
						<div>
							<dt>auth.user.id</dt>
							<dd>{auth.user?.id ?? 'demo unauthenticated'}</dd>
						</div>
						<div>
							<dt>auth.user.name</dt>
							<dd>{auth.user?.name ?? auth.user?.username ?? 'No session'}</dd>
						</div>
						<div>
							<dt>theme</dt>
							<dd>{colorScheme}</dd>
						</div>
						<div>
							<dt>locale</dt>
							<dd>{locale}</dd>
						</div>
						<div>
							<dt>format demo</dt>
							<dd>
								{formatMoney(1234.56, locale)} |{' '}
								{new Intl.DateTimeFormat(locale, {
									day: 'numeric',
									month: 'short',
									year: 'numeric',
								}).format(new Date('2026-07-09T10:00:00.000Z'))}
							</dd>
						</div>
					</dl>
				</VerificationPanel>

				<VerificationPanel title="Platform Query">
					{platformConfigQuery.isPending ? (
						<p role="status">Loading platform config...</p>
					) : null}
					{platformConfigQuery.isError ? (
						<p role="alert" className={styles.errorText}>
							{platformConfigQuery.error.message}
						</p>
					) : null}
					{platformConfigQuery.data ? (
						<dl className={styles.definitionList}>
							<div>
								<dt>App config status</dt>
								<dd>loaded</dd>
							</div>
							<div>
								<dt>Dashboard mode</dt>
								<dd>{platformConfigQuery.data.appMode}</dd>
							</div>
							<div>
								<dt>Enabled domains</dt>
								<dd>{platformConfigQuery.data.enabledDomains.join(', ')}</dd>
							</div>
							<div>
								<dt>Fetch count</dt>
								<dd>{platformConfigQuery.data.debug.fetchCount}</dd>
							</div>
							<div>
								<dt>Fetched at</dt>
								<dd>
									{formatTime(platformConfigQuery.data.debug.fetchedAt, locale)}
								</dd>
							</div>
							<div>
								<dt>Query owner</dt>
								<dd>PlatformQueryProvider only</dd>
							</div>
						</dl>
					) : null}
				</VerificationPanel>

				<VerificationPanel title="Platform Controls">
					<div className={styles.controlStack}>
						<button
							type="button"
							className={styles.controlButton}
							onClick={toggleTheme}
						>
							Toggle theme: {colorScheme}
						</button>
						<button
							type="button"
							className={styles.controlButton}
							onClick={switchLocale}
						>
							Switch locale: {locale}
						</button>
					</div>

					<h4 className={styles.subheading}>Feature flags</h4>
					<div className={styles.toggleGrid}>
						{featureFlagLabels.map((flag) => (
							<label key={flag.key} className={styles.toggleLabel}>
								<input
									type="checkbox"
									checked={featureFlags.flags[flag.key]}
									onChange={() => featureFlags.toggleFeatureFlag(flag.key)}
								/>
								{flag.label}
							</label>
						))}
					</div>

					<h4 className={styles.subheading}>Permissions</h4>
					<div className={styles.toggleGrid}>
						{(
							Object.entries(permissions.permissions.training) as Array<
								[keyof PlatformPermissions['training'], boolean]
							>
						).map(([key, value]) => (
							<label key={`training-${key}`} className={styles.toggleLabel}>
								<input
									type="checkbox"
									checked={value}
									onChange={() => permissions.toggleTrainingPermission(key)}
								/>
								training.{key}: {booleanLabel(value)}
							</label>
						))}
						{(
							Object.entries(permissions.permissions.finance) as Array<
								[keyof PlatformPermissions['finance'], boolean]
							>
						).map(([key, value]) => (
							<label key={`finance-${key}`} className={styles.toggleLabel}>
								<input
									type="checkbox"
									checked={value}
									onChange={() => permissions.toggleFinancePermission(key)}
								/>
								finance.{key}: {booleanLabel(value)}
							</label>
						))}
					</div>
				</VerificationPanel>

				<VerificationPanel title="Navigation Links">
					<div className={styles.linkRow}>
						<button
							type="button"
							className={styles.controlButton}
							onClick={() => navigateAndLog(publicRoutes.dashboard)}
						>
							Go to Dashboard
						</button>
						<a
							className={styles.inlineLink}
							href={navigation.createHref(publicRoutes.training)}
						>
							Go to Training
						</a>
						<a
							className={styles.inlineLink}
							href={navigation.createHref(publicRoutes.finance)}
						>
							Go to Finance
						</a>
					</div>
					<p className={styles.note}>
						Links use public route contracts and shell hash navigation.
					</p>
				</VerificationPanel>
			</div>

			{featureFlags.isEnabled('showDashboardAggregatePlaceholder') ? (
				<VerificationPanel title="Dashboard Aggregate">
					<p className={styles.note}>
						Cross-domain aggregate data belongs in an API/BFF endpoint such as
						/dashboard/overview later. This dashboard only composes public MFE
						widgets and a shell-owned platform query.
					</p>
				</VerificationPanel>
			) : null}

			<DashboardGrid>
				{featureFlags.isEnabled('training-mfe') ? (
					<RemoteWidgetBoundary
						key={`training-${widgetResetCount}`}
						name="Training"
					>
						{trainingWidgetError ? (
							<DemoWidgetError name="Training" />
						) : (
							<TrainingDashboardWidget />
						)}
					</RemoteWidgetBoundary>
				) : null}
				{featureFlags.isEnabled('finance-mfe') ? (
					<RemoteWidgetBoundary
						key={`finance-${widgetResetCount}`}
						name="Finance"
					>
						{financeWidgetError ? (
							<DemoWidgetError name="Finance" />
						) : (
							<FinanceDashboardWidget />
						)}
					</RemoteWidgetBoundary>
				) : null}
			</DashboardGrid>

			<div className={styles.panelGrid}>
				<VerificationPanel title="Error Boundary Test Controls">
					<div className={styles.linkRow}>
						<button
							type="button"
							className={styles.controlButton}
							onClick={() => {
								logInfo('Training widget demo error triggered');
								setTrainingWidgetError(true);
							}}
						>
							Trigger Training Widget Error
						</button>
						<button
							type="button"
							className={styles.controlButton}
							onClick={() => {
								logInfo('Finance widget demo error triggered');
								setFinanceWidgetError(true);
							}}
						>
							Trigger Finance Widget Error
						</button>
						<button
							type="button"
							className={styles.controlButton}
							onClick={resetWidgetErrors}
						>
							Reset Widget Errors
						</button>
					</div>
				</VerificationPanel>

				{featureFlags.isEnabled('dashboard-event-feed') ? (
					<VerificationPanel title="Event Feed">
						{recentEvents.length > 0 ? (
							<ul className={styles.eventList}>
								{recentEvents.map((recentEvent) => (
									<li key={recentEvent.id} className={styles.eventItem}>
										<span className={styles.eventLabel}>
											{recentEvent.event.type}
										</span>
										<span className={styles.eventPayload}>
											{JSON.stringify(recentEvent.event.payload)}
										</span>
										<time
											className={styles.eventTime}
											dateTime={recentEvent.occurredAtIso}
										>
											{formatTime(recentEvent.occurredAtIso, locale)}
										</time>
									</li>
								))}
							</ul>
						) : (
							<p className={styles.emptyEvent}>{t('dashboardNoEvents')}</p>
						)}
					</VerificationPanel>
				) : null}

				<VerificationPanel title="Observability Feed">
					{observabilityEntries.length > 0 ? (
						<ul className={styles.eventList}>
							{observabilityEntries.map((entry) => (
								<li key={entry.id} className={styles.eventItem}>
									<span className={styles.eventLabel}>
										{entry.level}: {entry.message}
									</span>
									<span className={styles.eventPayload}>{entry.source}</span>
									{entry.context ? (
										<span className={styles.eventPayload}>
											{JSON.stringify(entry.context)}
										</span>
									) : null}
									<time
										className={styles.eventTime}
										dateTime={entry.occurredAtIso}
									>
										{formatTime(entry.occurredAtIso, locale)}
									</time>
								</li>
							))}
						</ul>
					) : (
						<p className={styles.emptyEvent}>No observability entries yet.</p>
					)}
				</VerificationPanel>
			</div>
		</section>
	);
}
