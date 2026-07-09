import type { CurrencyCode, TrainingRange } from '../dtos/index.js';

export type AppContextValue = {
	appName: string;
	userId: string;
	userDisplayName: string;
	preferredLocale: string;
	defaultDashboardRange: TrainingRange;
	currency: CurrencyCode;
};

export const defaultAppContext: AppContextValue = {
	appName: 'Live Software',
	userId: 'demo-user',
	userDisplayName: 'Demo User',
	preferredLocale: 'es-ES',
	defaultDashboardRange: '30d',
	currency: 'EUR',
};

