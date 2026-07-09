import { I18nextProvider } from 'react-i18next';
import { useEffect, useState } from 'react';
import {
	patchPlatformRuntimeSnapshot,
	type PlatformLocaleCode,
} from '@live-software/contracts';
import { i18n } from '../../i18n';
import type { ReactNode } from 'react';

type LocaleProviderProps = {
	children: ReactNode;
};

export function LocaleProvider({ children }: LocaleProviderProps) {
	const [locale, setLocale] = useState<PlatformLocaleCode>(
		i18n.language === 'en-US' ? 'en-US' : 'es-ES',
	);

	useEffect(() => {
		patchPlatformRuntimeSnapshot({ locale });
	}, [locale]);

	useEffect(() => {
		const handleLanguageChange = (language: string) => {
			setLocale(language === 'en-US' ? 'en-US' : 'es-ES');
		};

		i18n.on('languageChanged', handleLanguageChange);

		return () => {
			i18n.off('languageChanged', handleLanguageChange);
		};
	}, []);

	return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
