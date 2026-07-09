import {
	MantineProvider,
	localStorageColorSchemeManager,
} from '@mantine/core';
import { liveSoftwareTheme } from '@live-software/ui-kit';
import type { ReactNode } from 'react';

const colorSchemeManager = localStorageColorSchemeManager({
	key: 'live-software-color-scheme',
});

type ThemeProviderProps = {
	children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
	return (
		<MantineProvider
			theme={liveSoftwareTheme}
			defaultColorScheme="auto"
			colorSchemeManager={colorSchemeManager}
		>
			{children}
		</MantineProvider>
	);
}

