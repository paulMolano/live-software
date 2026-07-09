import type { PublicRoutePath } from '../routes/index.js';

export type PlatformLocaleCode = 'es-ES' | 'en-US';

export type AppSettings = {
	locale: PlatformLocaleCode;
	currency: 'EUR';
	defaultDashboardRange: '7d' | '30d' | '90d';
};

export type PermissionKey = 'training:view' | 'finance:view' | 'dashboard:view';

export type FeatureFlagKey =
	| 'training-mfe'
	| 'finance-mfe'
	| 'dashboard-event-feed'
	| 'enableTrainingSessionCreation'
	| 'showTrainingProgressWidget'
	| 'enableFinanceTransactions'
	| 'showFinanceDebtWidget'
	| 'showDashboardAggregatePlaceholder';

export type FeatureFlagMap = Record<FeatureFlagKey, boolean>;

export type TrainingPermissions = {
	canView: boolean;
	canCreateSession: boolean;
};

export type FinancePermissions = {
	canView: boolean;
	canCreateTransaction: boolean;
	canViewSensitiveAmounts: boolean;
};

export type DashboardPermissions = {
	canView: boolean;
};

export type PlatformPermissions = {
	dashboard: DashboardPermissions;
	training: TrainingPermissions;
	finance: FinancePermissions;
};

export type NavigationItem = {
	label: string;
	path: PublicRoutePath;
};
