import { useEffect } from 'react';
import {
	logPlatformInfo,
	navigateToPublicRoute,
	publicRoutes,
	trainingRanges,
	trainingViews,
	type TrainingRange,
	type TrainingView,
} from '@live-software/contracts';
import { trainingKeys } from '../data/trainingKeys';
import { useCreateTrainingSession } from '../data/trainingMutations';
import {
	useTrainingSessions,
	useTrainingSummary,
} from '../data/trainingQueries';
import { usePlatformRuntime } from '../platform/usePlatformRuntime';
import { useTrainingUiStore } from '../state/trainingUiStore';
import * as styles from '../training.module.css';
import { writeTrainingUrlState } from './trainingUrlState';

const rangeOptions = trainingRanges;
const viewOptions = trainingViews;

function isTrainingRange(value: string): value is TrainingRange {
	return rangeOptions.some((range) => range === value);
}

function formatSessionDate(value: string, locale: string): string {
	return new Intl.DateTimeFormat(locale, {
		day: '2-digit',
		month: 'short',
		hour: '2-digit',
		minute: '2-digit',
	}).format(new Date(value));
}

function formatFetchedAt(value: string, locale: string): string {
	return new Intl.DateTimeFormat(locale, {
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
	}).format(new Date(value));
}

export function TrainingPage() {
	const platform = usePlatformRuntime();
	const selectedRange = useTrainingUiStore((state) => state.selectedRange);
	const activeView = useTrainingUiStore((state) => state.activeView);
	const compactMode = useTrainingUiStore((state) => state.compactMode);
	const setSelectedRange = useTrainingUiStore((state) => state.setSelectedRange);
	const setActiveView = useTrainingUiStore((state) => state.setActiveView);
	const setCompactMode = useTrainingUiStore((state) => state.setCompactMode);
	const summaryQuery = useTrainingSummary();
	const sessionsQuery = useTrainingSessions({ range: selectedRange });
	const createSession = useCreateTrainingSession();
	const canCreate =
		platform.permissions.training.canCreateSession &&
		platform.featureFlags.enableTrainingSessionCreation;

	const updateRange = (range: TrainingRange) => {
		setSelectedRange(range);
		writeTrainingUrlState({ range, view: activeView });
	};

	const updateView = (view: TrainingView) => {
		setActiveView(view);
		writeTrainingUrlState({ range: selectedRange, view });
	};

	useEffect(() => {
		if (summaryQuery.data) {
			logPlatformInfo('training-mfe', 'Training page loaded', {
				fetchCount: summaryQuery.data.debug.fetchCount,
				queryKey: trainingKeys.summary(),
			});
		}
	}, [summaryQuery.data]);

	if (!platform.permissions.training.canView) {
		return (
			<section className={styles.page} aria-labelledby="training-page-title">
				<header className={styles.pageHeader}>
					<div>
						<p className={styles.eyebrow}>Training domain</p>
						<h2 id="training-page-title" className={styles.pageTitle}>
							Entrenamiento
						</h2>
					</div>
					<button
						type="button"
						className={styles.secondaryButton}
						onClick={() => navigateToPublicRoute(publicRoutes.dashboard)}
					>
						Volver al dashboard
					</button>
				</header>
				<p role="alert" className={styles.errorText}>
					Restricted by training.canView.
				</p>
			</section>
		);
	}

	return (
		<section className={styles.page} aria-labelledby="training-page-title">
			<header className={styles.pageHeader}>
				<div>
					<p className={styles.eyebrow}>Training domain</p>
					<h2 id="training-page-title" className={styles.pageTitle}>
						Entrenamiento
					</h2>
				</div>
				<button
					type="button"
					className={styles.primaryButton}
					onClick={() =>
						createSession.mutate({
							type: 'strength',
							title: 'Sesion de fuerza',
							durationMinutes: 50,
						})
					}
					disabled={createSession.isPending || !canCreate}
				>
					{createSession.isPending ? 'Guardando...' : 'Nueva sesion'}
				</button>
			</header>

			<div className={styles.actionRow}>
				<button
					type="button"
					className={styles.secondaryButton}
					onClick={() => navigateToPublicRoute(publicRoutes.dashboard)}
				>
					Volver al dashboard
				</button>
				<span className={styles.muted}>
					{canCreate
						? 'Creation enabled by contract.'
						: 'Creation disabled by permission or feature flag.'}
				</span>
			</div>

			<form className={styles.toolbar}>
				<label className={styles.fieldLabel} htmlFor="training-range">
					Rango
				</label>
				<select
					id="training-range"
					className={styles.select}
					value={selectedRange}
					onChange={(event) => {
						const { value } = event.currentTarget;

						if (isTrainingRange(value)) {
							updateRange(value);
						}
					}}
				>
					{rangeOptions.map((range) => (
						<option key={range} value={range}>
							{range}
						</option>
					))}
				</select>

				<div className={styles.segmentedControl} aria-label="Vista training">
					{viewOptions.map((view) => {
						const isActive = activeView === view;

						return (
							<button
								key={view}
								type="button"
								className={`${styles.segmentedButton} ${
									isActive ? styles.segmentedButtonActive : ''
								}`}
								aria-pressed={isActive}
								onClick={() => updateView(view)}
							>
								{view}
							</button>
						);
					})}
				</div>

				<label className={styles.checkboxLabel}>
					<input
						type="checkbox"
						checked={compactMode}
						onChange={(event) => setCompactMode(event.currentTarget.checked)}
					/>
					Compacto
				</label>
			</form>

			<dl className={styles.debugList} aria-label="Training runtime state">
				<div>
					<dt>UI store</dt>
					<dd>
						range={selectedRange}, view={activeView}, compact=
						{compactMode ? 'true' : 'false'}
					</dd>
				</div>
				<div>
					<dt>Permissions</dt>
					<dd>
						view={platform.permissions.training.canView ? 'true' : 'false'},
						create=
						{platform.permissions.training.canCreateSession ? 'true' : 'false'}
					</dd>
				</div>
				<div>
					<dt>Flags</dt>
					<dd>
						create=
						{platform.featureFlags.enableTrainingSessionCreation
							? 'true'
							: 'false'}
						, progress=
						{platform.featureFlags.showTrainingProgressWidget ? 'true' : 'false'}
					</dd>
				</div>
			</dl>

			{summaryQuery.isPending || sessionsQuery.isPending ? (
				<p role="status" className={styles.muted}>
					Cargando entrenamiento...
				</p>
			) : null}

			{summaryQuery.isError ? (
				<p role="alert" className={styles.errorText}>
					{summaryQuery.error.message}
				</p>
			) : null}

			{summaryQuery.data ? (
				<section className={styles.summaryBand} aria-label="Resumen training">
					<div>
						<span className={styles.metricValue}>
							{summaryQuery.data.weeklySessions}
						</span>
						<span className={styles.muted}>sesiones esta semana</span>
					</div>
					<div>
						<span className={styles.metricValue}>
							{summaryQuery.data.currentStreak}
						</span>
						<span className={styles.muted}>dias de racha</span>
					</div>
				</section>
			) : null}

			{summaryQuery.data ? (
				<dl className={styles.debugList} aria-label="Training query debug">
					<div>
						<dt>Summary query key</dt>
						<dd>{JSON.stringify(trainingKeys.summary())}</dd>
					</div>
					<div>
						<dt>Sessions query key</dt>
						<dd>
							{JSON.stringify(trainingKeys.sessions({ range: selectedRange }))}
						</dd>
					</div>
					<div>
						<dt>Fetch count</dt>
						<dd>{summaryQuery.data.debug.fetchCount}</dd>
					</div>
					<div>
						<dt>Fetched at</dt>
						<dd>
							{formatFetchedAt(summaryQuery.data.debug.fetchedAt, platform.locale)}
						</dd>
					</div>
				</dl>
			) : null}

			{sessionsQuery.data?.length === 0 ? (
				<p className={styles.muted}>No hay sesiones en este rango.</p>
			) : null}

			{sessionsQuery.data && sessionsQuery.data.length > 0 ? (
				<ul className={styles.list}>
					{sessionsQuery.data.map((session) => (
						<li key={session.id} className={styles.listItem}>
							<div>
								<strong>{session.title}</strong>
								<span className={styles.muted}>
									{session.type} -{' '}
									{formatSessionDate(session.date, platform.locale)}
								</span>
							</div>
							<span>{session.durationMinutes} min</span>
						</li>
					))}
				</ul>
			) : null}
		</section>
	);
}
