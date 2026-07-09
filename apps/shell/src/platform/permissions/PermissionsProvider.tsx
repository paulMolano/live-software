import {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
	type ReactNode,
} from 'react';
import {
	defaultPlatformPermissions,
	patchPlatformRuntimeSnapshot,
	type PermissionKey,
	type PlatformPermissions,
} from '@live-software/contracts';

type PermissionsContextValue = {
	permissions: PlatformPermissions;
	hasPermission: (permission: PermissionKey) => boolean;
	setTrainingPermission: (
		permission: keyof PlatformPermissions['training'],
		enabled: boolean,
	) => void;
	setFinancePermission: (
		permission: keyof PlatformPermissions['finance'],
		enabled: boolean,
	) => void;
	toggleTrainingPermission: (
		permission: keyof PlatformPermissions['training'],
	) => void;
	toggleFinancePermission: (
		permission: keyof PlatformPermissions['finance'],
	) => void;
};

const PermissionsContext = createContext<PermissionsContextValue | null>(null);

type PermissionsProviderProps = {
	children: ReactNode;
	permissions?: PlatformPermissions;
};

export function PermissionsProvider({
	children,
	permissions: initialPermissions = defaultPlatformPermissions,
}: PermissionsProviderProps) {
	const [permissions, setPermissions] =
		useState<PlatformPermissions>(initialPermissions);

	useEffect(() => {
		patchPlatformRuntimeSnapshot({ permissions });
	}, [permissions]);

	const value = useMemo<PermissionsContextValue>(
		() => ({
			permissions,
			hasPermission: (permission) => {
				switch (permission) {
					case 'dashboard:view':
						return permissions.dashboard.canView;
					case 'training:view':
						return true;
					case 'finance:view':
						return true;
				}
			},
			setTrainingPermission: (permission, enabled) =>
				setPermissions((current) => ({
					...current,
					training: {
						...current.training,
						[permission]: enabled,
					},
				})),
			setFinancePermission: (permission, enabled) =>
				setPermissions((current) => ({
					...current,
					finance: {
						...current.finance,
						[permission]: enabled,
					},
				})),
			toggleTrainingPermission: (permission) =>
				setPermissions((current) => ({
					...current,
					training: {
						...current.training,
						[permission]: !current.training[permission],
					},
				})),
			toggleFinancePermission: (permission) =>
				setPermissions((current) => ({
					...current,
					finance: {
						...current.finance,
						[permission]: !current.finance[permission],
					},
				})),
		}),
		[permissions],
	);

	return (
		<PermissionsContext.Provider value={value}>
			{children}
		</PermissionsContext.Provider>
	);
}

export function usePlatformPermissions(): PermissionsContextValue {
	const context = useContext(PermissionsContext);

	if (!context) {
		throw new Error(
			'usePlatformPermissions must be used inside PermissionsProvider.',
		);
	}

	return context;
}
