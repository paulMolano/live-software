import {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
	type ReactNode,
} from 'react';
import {
	defaultFeatureFlags,
	patchPlatformRuntimeSnapshot,
	type FeatureFlagKey,
	type FeatureFlagMap,
} from '@live-software/contracts';

type FeatureFlagsContextValue = {
	flags: FeatureFlagMap;
	isEnabled: (flag: FeatureFlagKey) => boolean;
	setFeatureFlag: (flag: FeatureFlagKey, enabled: boolean) => void;
	toggleFeatureFlag: (flag: FeatureFlagKey) => void;
};

const FeatureFlagsContext = createContext<FeatureFlagsContextValue | null>(null);

type FeatureFlagsProviderProps = {
	children: ReactNode;
	flags?: FeatureFlagMap;
};

export function FeatureFlagsProvider({
	children,
	flags: initialFlags = defaultFeatureFlags,
}: FeatureFlagsProviderProps) {
	const [flags, setFlags] = useState<FeatureFlagMap>(initialFlags);

	useEffect(() => {
		patchPlatformRuntimeSnapshot({ featureFlags: flags });
	}, [flags]);

	const value = useMemo<FeatureFlagsContextValue>(
		() => ({
			flags,
			isEnabled: (flag) => flags[flag],
			setFeatureFlag: (flag, enabled) =>
				setFlags((current) => ({
					...current,
					[flag]: enabled,
				})),
			toggleFeatureFlag: (flag) =>
				setFlags((current) => ({
					...current,
					[flag]: !current[flag],
				})),
		}),
		[flags],
	);

	return (
		<FeatureFlagsContext.Provider value={value}>
			{children}
		</FeatureFlagsContext.Provider>
	);
}

export function useFeatureFlags(): FeatureFlagsContextValue {
	const context = useContext(FeatureFlagsContext);

	if (!context) {
		throw new Error('useFeatureFlags must be used inside FeatureFlagsProvider.');
	}

	return context;
}
