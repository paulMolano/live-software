import { useSyncExternalStore } from 'react';
import {
	getPlatformRuntimeSnapshot,
	subscribePlatformRuntime,
} from '@live-software/contracts';

export function usePlatformRuntime() {
	return useSyncExternalStore(
		subscribePlatformRuntime,
		getPlatformRuntimeSnapshot,
		getPlatformRuntimeSnapshot,
	);
}

