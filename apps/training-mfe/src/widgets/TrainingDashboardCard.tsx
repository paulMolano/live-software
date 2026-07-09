import { useEffect } from 'react';
import {
	logPlatformInfo,
	navigateToPublicRoute,
	publicRoutes,
} from '@live-software/contracts';
import { useCreateTrainingSession } from '../data/trainingMutations';
import { trainingKeys } from '../data/trainingKeys';
import { useTrainingSummary } from '../data/trainingQueries';
import { usePlatformRuntime } from '../platform/usePlatformRuntime';
import { useTrainingUiStore } from '../state/trainingUiStore';
import * as styles from '../training.module.css';

function formatDate(value: string | null, locale: string): string {
	if (!value) {
		return 'Sin sesiones';
	}

	return new Intl.DateTimeFormat(locale, {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
	}).format(new Date(value));
}

function QueryDebug({
	fetchCount,
	fetchedAt,
	locale,
}: {
	fetchCount: number;
	fetchedAt: string;
	locale: string;
}) {
	return (
		<dl className={styles.debugList}>
			<div>
				<dt>Query key</dt>
				<dd>{JSON.stringify(trainingKeys.summary())}</dd>
			</div>
			<div>
				<dt>Fetch count</dt>
				<dd>{fetchCount}</dd>
			</div>
			<div>
				<dt>Fetched at</dt>
				<dd>
					{new Intl.DateTimeFormat(locale, {
						hour: '2-digit',
						minute: '2-digit',
						second: '2-digit',
					}).format(new Date(fetchedAt))}
				</dd>
			</div>
		</dl>
	);
}

export function TrainingDashboardCard() {
	const platform = usePlatformRuntime();
	const selectedRange = useTrainingUiStore((state) => state.selectedRange);
	const compactMode = useTrainingUiStore((state) => state.compactMode);
	const setCompactMode = useTrainingUiStore((state) => state.setCompactMode);
	const { data, error, isError, isPending } = useTrainingSummary();
	const createSession = useCreateTrainingSession();
	const canCreate =
		platform.permissions.training.canCreateSession &&
		platform.featureFlags.enableTrainingSessionCreation;

	useEffect(() => {
		if (data) {
			logPlatformInfo('training-mfe', 'Training widget loaded', {
				fetchCount: data.debug.fetchCount,
			});
		}
	}, [data]);

	if (!platform.permissions.training.canView) {
		return (
			<article className={styles.card} aria-labelledby="training-widget-title">
				<h3 id="training-widget-title" className={styles.cardTitle}>
					Training
				</h3>
				<p className={styles.muted}>Restricted by training.canView.</p>
			</article>
		);
	}

	if (isPending) {
		return (
			<article className={styles.card} aria-labelledby="training-widget-title">
				<h3 id="training-widget-title" className={styles.cardTitle}>
					Training
				</h3>
				<p role="status" className={styles.muted}>
					Cargando resumen...
				</p>
			</article>
		);
	}

	if (isError) {
		return (
			<article className={styles.card} aria-labelledby="training-widget-title">
				<h3 id="training-widget-title" className={styles.cardTitle}>
					Training
				</h3>
				<p role="alert" className={styles.errorText}>
					{error.message}
				</p>
			</article>
		);
	}

	if (!data || data.weeklyTarget === 0) {
		return (
			<article className={styles.card} aria-labelledby="training-widget-title">
				<h3 id="training-widget-title" className={styles.cardTitle}>
					Training
				</h3>
				<p className={styles.muted}>Aun no hay objetivo semanal.</p>
			</article>
		);
	}

	const completion = Math.min(
		100,
		Math.round((data.weeklySessions / data.weeklyTarget) * 100),
	);

	return (
		<article className={styles.card} aria-labelledby="training-widget-title">
			<div className={styles.cardHeader}>
				<div>
					<p className={styles.eyebrow}>{selectedRange}</p>
					<h3 id="training-widget-title" className={styles.cardTitle}>
						Training
					</h3>
				</div>
				<button
					type="button"
					className={styles.secondaryButton}
					onClick={() => setCompactMode(!compactMode)}
					aria-pressed={compactMode}
				>
					{compactMode ? 'Detalle' : 'Compacto'}
				</button>
			</div>

			<div className={styles.metricRow}>
				<strong className={styles.metricValue}>
					{data.weeklySessions}/{data.weeklyTarget}
				</strong>
				<span className={styles.muted}>sesiones semanales</span>
			</div>

			{platform.featureFlags.showTrainingProgressWidget ? (
				<div
					className={styles.progressTrack}
					role="progressbar"
					aria-valuemin={0}
					aria-valuemax={100}
					aria-valuenow={completion}
					aria-label="Progreso semanal de entrenamiento"
				>
					<span
						className={styles.progressFill}
						style={{ inlineSize: `${completion}%` }}
					/>
				</div>
			) : (
				<p className={styles.muted}>Progress section hidden by feature flag.</p>
			)}

			{compactMode ? null : (
				<dl className={styles.detailList}>
					<div>
						<dt>Ultima sesion</dt>
						<dd>{formatDate(data.lastSessionDate, platform.locale)}</dd>
					</div>
					<div>
						<dt>Racha</dt>
						<dd>{data.currentStreak} dias</dd>
					</div>
				</dl>
			)}

			<dl className={styles.debugList} aria-label="Training widget runtime">
				<div>
					<dt>UI store</dt>
					<dd>
						range={selectedRange}, compact={compactMode ? 'true' : 'false'}
					</dd>
				</div>
				<div>
					<dt>Permissions</dt>
					<dd>
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

			<QueryDebug
				fetchCount={data.debug.fetchCount}
				fetchedAt={data.debug.fetchedAt}
				locale={platform.locale}
			/>

			<div className={styles.actionRow}>
				<button
					type="button"
					className={styles.primaryButton}
					onClick={() =>
						createSession.mutate({
							type: 'strength',
							title: 'Sesion demo',
							durationMinutes: 45,
						})
					}
					disabled={createSession.isPending || !canCreate}
				>
					{createSession.isPending ? 'Guardando...' : 'Registrar sesion'}
				</button>
				<button
					type="button"
					className={styles.secondaryButton}
					onClick={() => navigateToPublicRoute(publicRoutes.training)}
				>
					Open Training
				</button>
			</div>

			{canCreate ? null : (
				<p className={styles.muted}>
					Creation disabled by permission or feature flag.
				</p>
			)}
		</article>
	);
}
