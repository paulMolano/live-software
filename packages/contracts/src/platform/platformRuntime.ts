import { publicRoutes, type PublicRoutePath } from '../routes/index.js';
import type {
	FeatureFlagMap,
	PlatformLocaleCode,
	PlatformPermissions,
} from './platformTypes.js';

export type PlatformRuntimeSnapshot = {
	featureFlags: FeatureFlagMap;
	locale: PlatformLocaleCode;
	permissions: PlatformPermissions;
};

export type PlatformRuntimeListener = () => void;

export const defaultFeatureFlags: FeatureFlagMap = {
	'training-mfe': true,
	'finance-mfe': true,
	'dashboard-event-feed': true,
	enableTrainingSessionCreation: true,
	showTrainingProgressWidget: true,
	enableFinanceTransactions: true,
	showFinanceDebtWidget: true,
	showDashboardAggregatePlaceholder: true,
};

export const defaultPlatformPermissions: PlatformPermissions = {
	dashboard: {
		canView: true,
	},
	training: {
		canView: true,
		canCreateSession: true,
	},
	finance: {
		canView: true,
		canCreateTransaction: true,
		canViewSensitiveAmounts: true,
	},
};

const listeners = new Set<PlatformRuntimeListener>();

let currentSnapshot: PlatformRuntimeSnapshot = {
	featureFlags: defaultFeatureFlags,
	locale: 'es-ES',
	permissions: defaultPlatformPermissions,
};

function emitSnapshotChange() {
	listeners.forEach((listener) => listener());
}

export function getPlatformRuntimeSnapshot(): PlatformRuntimeSnapshot {
	return currentSnapshot;
}

export function subscribePlatformRuntime(
	listener: PlatformRuntimeListener,
): () => void {
	listeners.add(listener);

	return () => {
		listeners.delete(listener);
	};
}

export function setPlatformRuntimeSnapshot(
	snapshot: PlatformRuntimeSnapshot,
): void {
	currentSnapshot = snapshot;
	emitSnapshotChange();
}

export function patchPlatformRuntimeSnapshot(
	patch: Partial<PlatformRuntimeSnapshot>,
): void {
	currentSnapshot = {
		...currentSnapshot,
		...patch,
	};
	emitSnapshotChange();
}

export function createHashHref(path: PublicRoutePath): string {
	return `#${path}`;
}

export function navigateToPublicRoute(path: PublicRoutePath): void {
	if (typeof window === 'undefined') {
		return;
	}

	window.location.hash = path;
}

export function getDefaultDashboardHref(): string {
	return createHashHref(publicRoutes.dashboard);
}
