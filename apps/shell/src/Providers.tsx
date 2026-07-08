import {
  MantineProvider,
  localStorageColorSchemeManager,
} from '@mantine/core';
import { QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import { createAppQueryClient } from '@live-software/config';
import { liveSoftwareTheme } from '@live-software/ui-kit';
import { i18n } from './i18n';
import type { ReactNode } from 'react';

const colorSchemeManager = localStorageColorSchemeManager({
  key: 'live-software-color-scheme',
});

const queryClient = createAppQueryClient();

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider
          theme={liveSoftwareTheme}
          defaultColorScheme="auto"
          colorSchemeManager={colorSchemeManager}
        >
          {children}
        </MantineProvider>
      </QueryClientProvider>
    </I18nextProvider>
  );
}
