import { AuthProvider as BaseAuthProvider } from '@live-software/auth';
import { createShellAuthConfig } from '../../auth-runtime-config';
import type { ReactNode } from 'react';

const authConfig = createShellAuthConfig();

type PlatformAuthProviderProps = {
	children: ReactNode;
};

export function PlatformAuthProvider({ children }: PlatformAuthProviderProps) {
	return <BaseAuthProvider config={authConfig}>{children}</BaseAuthProvider>;
}

