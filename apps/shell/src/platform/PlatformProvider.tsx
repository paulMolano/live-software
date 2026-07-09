import type { ReactNode } from 'react';
import { AppContextProvider } from './appContext/AppContext';
import { PlatformAuthProvider } from './auth/AuthProvider';
import { EventBusProvider } from './event-bus/EventBusProvider';
import { FeatureFlagsProvider } from './feature-flags/FeatureFlagsProvider';
import { LocaleProvider } from './locale/LocaleProvider';
import { NavigationProvider } from './navigation/NavigationProvider';
import { ObservabilityProvider } from './observability/ObservabilityProvider';
import { PermissionsProvider } from './permissions/PermissionsProvider';
import { PlatformQueryProvider } from './query/PlatformQueryProvider';
import { ThemeProvider } from './theme/ThemeProvider';

type PlatformProviderProps = {
	children: ReactNode;
};

export function PlatformProvider({ children }: PlatformProviderProps) {
	return (
		<ObservabilityProvider>
			<EventBusProvider>
				<PlatformAuthProvider>
					<PlatformQueryProvider>
						<AppContextProvider>
							<ThemeProvider>
								<LocaleProvider>
									<PermissionsProvider>
										<FeatureFlagsProvider>
											<NavigationProvider>{children}</NavigationProvider>
										</FeatureFlagsProvider>
									</PermissionsProvider>
								</LocaleProvider>
							</ThemeProvider>
						</AppContextProvider>
					</PlatformQueryProvider>
				</PlatformAuthProvider>
			</EventBusProvider>
		</ObservabilityProvider>
	);
}

