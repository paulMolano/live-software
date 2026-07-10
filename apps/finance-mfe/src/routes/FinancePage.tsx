import { useEffect } from 'react';
import {
	financeViews,
	logPlatformInfo,
	navigateToPublicRoute,
	publicRoutes,
	type FinanceView,
} from '@live-software/contracts';
import { financeKeys } from '../data/financeKeys';
import { useCreateFinanceTransaction } from '../data/financeMutations';
import {
	useFinanceDebtSummary,
	useFinanceMonthlySummary,
	useRecentFinanceTransactions,
} from '../data/financeQueries';
import { usePlatformRuntime } from '../platform/usePlatformRuntime';
import { useFinanceUiStore } from '../state/financeUiStore';
import * as styles from '../finance.module.css';
import { writeFinanceUrlState } from './financeUrlState';

const viewOptions = financeViews;

function formatMoney(value: number, hide: boolean, locale: string): string {
	if (hide) {
		return '***';
	}

	return new Intl.NumberFormat(locale, {
		style: 'currency',
		currency: 'EUR',
	}).format(value);
}

function formatDate(value: string, locale: string): string {
	return new Intl.DateTimeFormat(locale, {
		day: '2-digit',
		month: 'short',
	}).format(new Date(value));
}

function formatFetchedAt(value: string, locale: string): string {
	return new Intl.DateTimeFormat(locale, {
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
	}).format(new Date(value));
}

export function FinancePage() {
	const platform = usePlatformRuntime();
	const selectedMonth = useFinanceUiStore((state) => state.selectedMonth);
	const selectedFinanceView = useFinanceUiStore(
		(state) => state.selectedFinanceView,
	);
	const hideSensitiveAmounts = useFinanceUiStore(
		(state) => state.hideSensitiveAmounts,
	);
	const setSelectedMonth = useFinanceUiStore((state) => state.setSelectedMonth);
	const setSelectedFinanceView = useFinanceUiStore(
		(state) => state.setSelectedFinanceView,
	);
	const setHideSensitiveAmounts = useFinanceUiStore(
		(state) => state.setHideSensitiveAmounts,
	);
	const summaryQuery = useFinanceMonthlySummary(selectedMonth);
	const debtQuery = useFinanceDebtSummary();
	const transactionsQuery = useRecentFinanceTransactions();
	const createTransaction = useCreateFinanceTransaction();
	const hideAmounts =
		hideSensitiveAmounts || !platform.permissions.finance.canViewSensitiveAmounts;
	const canCreate =
		platform.permissions.finance.canCreateTransaction &&
		platform.featureFlags.enableFinanceTransactions;

	const updateMonth = (month: string) => {
		setSelectedMonth(month);
		writeFinanceUrlState({ month, view: selectedFinanceView });
	};

	const updateView = (view: FinanceView) => {
		setSelectedFinanceView(view);
		writeFinanceUrlState({ month: selectedMonth, view });
	};

	useEffect(() => {
		if (summaryQuery.data) {
			logPlatformInfo('finance-mfe', 'Finance page loaded', {
				fetchCount: summaryQuery.data.debug.fetchCount,
				queryKey: financeKeys.monthlySummary(selectedMonth),
			});
		}
	}, [selectedMonth, summaryQuery.data]);

	if (!platform.permissions.finance.canView) {
		return (
			<section className={styles.page} aria-labelledby="finance-page-title">
				<header className={styles.pageHeader}>
					<div>
						<p className={styles.eyebrow}>Finance domain</p>
						<h2 id="finance-page-title" className={styles.pageTitle}>
							Finanzas
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
					Restricted by finance.canView.
				</p>
			</section>
		);
	}

	return (
		<section className={styles.page} aria-labelledby="finance-page-title">
			<header className={styles.pageHeader}>
				<div>
					<p className={styles.eyebrow}>Finance domain</p>
					<h2 id="finance-page-title" className={styles.pageTitle}>
						Finanzas
					</h2>
				</div>
				<button
					type="button"
					className={styles.primaryButton}
					onClick={() =>
						createTransaction.mutate({
							description: 'Movimiento demo',
							amount: 22,
							type: 'expense',
							category: 'misc',
						})
					}
					disabled={createTransaction.isPending || !canCreate}
				>
					{createTransaction.isPending ? 'Guardando...' : 'Nuevo movimiento'}
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
				<label className={styles.fieldLabel} htmlFor="finance-month">
					Mes
				</label>
				<input
					id="finance-month"
					className={styles.input}
					type="month"
					value={selectedMonth}
					onChange={(event) => updateMonth(event.currentTarget.value)}
				/>

				<div className={styles.segmentedControl} aria-label="Vista finance">
					{viewOptions.map((view) => {
						const isActive = selectedFinanceView === view;

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
						checked={hideSensitiveAmounts}
						disabled={!platform.permissions.finance.canViewSensitiveAmounts}
						onChange={(event) =>
							setHideSensitiveAmounts(event.currentTarget.checked)
						}
					/>
					Ocultar importes
				</label>
			</form>

			<dl className={styles.debugList} aria-label="Finance runtime state">
				<div>
					<dt>UI store</dt>
					<dd>
						month={selectedMonth}, view={selectedFinanceView}, hideSensitive=
						{hideSensitiveAmounts ? 'true' : 'false'}
					</dd>
				</div>
				<div>
					<dt>Permissions</dt>
					<dd>
						view={platform.permissions.finance.canView ? 'true' : 'false'},
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

			{summaryQuery.isPending ||
			(platform.featureFlags.showFinanceDebtWidget && debtQuery.isPending) ? (
				<p role="status" className={styles.muted}>
					Cargando finanzas...
				</p>
			) : null}

			{summaryQuery.isError ? (
				<p role="alert" className={styles.errorText}>
					{summaryQuery.error.message}
				</p>
			) : null}

			{summaryQuery.data ? (
				<section className={styles.summaryBand} aria-label="Resumen finance">
					<div>
						<span className={styles.metricValue}>
							{formatMoney(summaryQuery.data.remaining, hideAmounts, platform.locale)}
						</span>
						<span className={styles.muted}>disponible</span>
					</div>
					{platform.featureFlags.showFinanceDebtWidget ? (
						<div>
							<span className={styles.metricValue}>
								{formatMoney(
									debtQuery.data?.total ?? summaryQuery.data.debtTotal,
									hideAmounts,
									platform.locale,
								)}
							</span>
							<span className={styles.muted}>deuda total</span>
						</div>
					) : null}
				</section>
			) : null}

			{summaryQuery.data ? (
				<dl className={styles.debugList} aria-label="Finance query debug">
					<div>
						<dt>Monthly query key</dt>
						<dd>{JSON.stringify(financeKeys.monthlySummary(selectedMonth))}</dd>
					</div>
					<div>
						<dt>Debts query key</dt>
						<dd>{JSON.stringify(financeKeys.debts())}</dd>
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

			{summaryQuery.data && !platform.featureFlags.showFinanceDebtWidget ? (
				<p className={styles.muted}>Debt section hidden by feature flag.</p>
			) : null}

			{transactionsQuery.data?.length === 0 ? (
				<p className={styles.muted}>No hay movimientos recientes.</p>
			) : null}

			{transactionsQuery.data && transactionsQuery.data.length > 0 ? (
				<ul className={styles.list}>
					{transactionsQuery.data.map((transaction) => (
						<li key={transaction.id} className={styles.listItem}>
							<div>
								<strong>{transaction.description}</strong>
								<span className={styles.muted}>
									{transaction.category} -{' '}
									{formatDate(transaction.date, platform.locale)}
								</span>
							</div>
							<span>
								{transaction.type === 'expense' ? '-' : '+'}
								{formatMoney(transaction.amount, hideAmounts, platform.locale)}
							</span>
						</li>
					))}
				</ul>
			) : null}
		</section>
	);
}
