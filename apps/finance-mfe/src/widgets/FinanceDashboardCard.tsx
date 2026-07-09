import { useEffect } from 'react';
import {
	logPlatformInfo,
	navigateToPublicRoute,
	publicRoutes,
} from '@live-software/contracts';
import { financeKeys } from '../data/financeKeys';
import { useCreateFinanceTransaction } from '../data/financeMutations';
import { useFinanceMonthlySummary } from '../data/financeQueries';
import { usePlatformRuntime } from '../platform/usePlatformRuntime';
import { useFinanceUiStore } from '../state/financeUiStore';
import * as styles from '../finance.module.css';

function formatMoney(value: number, hide: boolean, locale: string): string {
	if (hide) {
		return '***';
	}

	return new Intl.NumberFormat(locale, {
		style: 'currency',
		currency: 'EUR',
		maximumFractionDigits: 0,
	}).format(value);
}

function formatFetchedAt(value: string, locale: string): string {
	return new Intl.DateTimeFormat(locale, {
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
	}).format(new Date(value));
}

export function FinanceDashboardCard() {
	const platform = usePlatformRuntime();
	const selectedMonth = useFinanceUiStore((state) => state.selectedMonth);
	const hideSensitiveAmounts = useFinanceUiStore(
		(state) => state.hideSensitiveAmounts,
	);
	const setHideSensitiveAmounts = useFinanceUiStore(
		(state) => state.setHideSensitiveAmounts,
	);
	const { data, error, isError, isPending } =
		useFinanceMonthlySummary(selectedMonth);
	const createTransaction = useCreateFinanceTransaction();
	const hideAmounts =
		hideSensitiveAmounts || !platform.permissions.finance.canViewSensitiveAmounts;
	const canCreate =
		platform.permissions.finance.canCreateTransaction &&
		platform.featureFlags.enableFinanceTransactions;

	useEffect(() => {
		if (data) {
			logPlatformInfo('finance-mfe', 'Finance widget loaded', {
				fetchCount: data.debug.fetchCount,
				queryKey: financeKeys.monthlySummary(selectedMonth),
			});
		}
	}, [data, selectedMonth]);

	if (!platform.permissions.finance.canView) {
		return (
			<article className={styles.card} aria-labelledby="finance-widget-title">
				<h3 id="finance-widget-title" className={styles.cardTitle}>
					Finance
				</h3>
				<p className={styles.muted}>Restricted by finance.canView.</p>
			</article>
		);
	}

	if (isPending) {
		return (
			<article className={styles.card} aria-labelledby="finance-widget-title">
				<h3 id="finance-widget-title" className={styles.cardTitle}>
					Finance
				</h3>
				<p role="status" className={styles.muted}>
					Cargando resumen...
				</p>
			</article>
		);
	}

	if (isError) {
		return (
			<article className={styles.card} aria-labelledby="finance-widget-title">
				<h3 id="finance-widget-title" className={styles.cardTitle}>
					Finance
				</h3>
				<p role="alert" className={styles.errorText}>
					{error.message}
				</p>
			</article>
		);
	}

	if (!data || (data.income === 0 && data.expenses === 0)) {
		return (
			<article className={styles.card} aria-labelledby="finance-widget-title">
				<h3 id="finance-widget-title" className={styles.cardTitle}>
					Finance
				</h3>
				<p className={styles.muted}>No hay movimientos para este mes.</p>
			</article>
		);
	}

	return (
		<article className={styles.card} aria-labelledby="finance-widget-title">
			<div className={styles.cardHeader}>
				<div>
					<p className={styles.eyebrow}>{selectedMonth}</p>
					<h3 id="finance-widget-title" className={styles.cardTitle}>
						Finance
					</h3>
				</div>
				<button
					type="button"
					className={styles.secondaryButton}
					onClick={() => setHideSensitiveAmounts(!hideSensitiveAmounts)}
					aria-pressed={hideSensitiveAmounts}
					disabled={!platform.permissions.finance.canViewSensitiveAmounts}
				>
					{platform.permissions.finance.canViewSensitiveAmounts
						? hideSensitiveAmounts
							? 'Mostrar'
							: 'Ocultar'
						: 'Bloqueado'}
				</button>
			</div>

			<div className={styles.metricRow}>
				<strong className={styles.metricValue}>
					{formatMoney(data.remaining, hideAmounts, platform.locale)}
				</strong>
				<span className={styles.muted}>disponible</span>
			</div>

			<dl className={styles.detailList}>
				<div>
					<dt>Ingresos</dt>
					<dd>{formatMoney(data.income, hideAmounts, platform.locale)}</dd>
				</div>
				<div>
					<dt>Gastos</dt>
					<dd>{formatMoney(data.expenses, hideAmounts, platform.locale)}</dd>
				</div>
				{platform.featureFlags.showFinanceDebtWidget ? (
					<div>
						<dt>Deuda</dt>
						<dd>{formatMoney(data.debtTotal, hideAmounts, platform.locale)}</dd>
					</div>
				) : null}
			</dl>

			<dl className={styles.debugList} aria-label="Finance widget runtime">
				<div>
					<dt>UI store</dt>
					<dd>
						month={selectedMonth}, hideSensitive=
						{hideSensitiveAmounts ? 'true' : 'false'}
					</dd>
				</div>
				<div>
					<dt>Permissions</dt>
					<dd>
						create=
						{platform.permissions.finance.canCreateTransaction
							? 'true'
							: 'false'}
						, amounts=
						{platform.permissions.finance.canViewSensitiveAmounts
							? 'true'
							: 'false'}
					</dd>
				</div>
				<div>
					<dt>Flags</dt>
					<dd>
						create={platform.featureFlags.enableFinanceTransactions ? 'true' : 'false'}
						, debt=
						{platform.featureFlags.showFinanceDebtWidget ? 'true' : 'false'}
					</dd>
				</div>
			</dl>

			<dl className={styles.debugList} aria-label="Finance query debug">
				<div>
					<dt>Query key</dt>
					<dd>{JSON.stringify(financeKeys.monthlySummary(selectedMonth))}</dd>
				</div>
				<div>
					<dt>Fetch count</dt>
					<dd>{data.debug.fetchCount}</dd>
				</div>
				<div>
					<dt>Fetched at</dt>
					<dd>{formatFetchedAt(data.debug.fetchedAt, platform.locale)}</dd>
				</div>
			</dl>

			<div className={styles.actionRow}>
				<button
					type="button"
					className={styles.primaryButton}
					onClick={() =>
						createTransaction.mutate({
							description: 'Gasto demo',
							amount: 18,
							type: 'expense',
							category: 'misc',
						})
					}
					disabled={createTransaction.isPending || !canCreate}
				>
					{createTransaction.isPending ? 'Guardando...' : 'Anadir gasto'}
				</button>
				<button
					type="button"
					className={styles.secondaryButton}
					onClick={() => navigateToPublicRoute(publicRoutes.finance)}
				>
					Open Finance
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
