import type { LocaleCode } from '@live-software/contracts';
import { supportedLocales } from '@live-software/contracts';

export const defaultTrainingLocale: LocaleCode = 'en';

export function normalizeTrainingLocale(locale: string | undefined): LocaleCode {
	if (locale === undefined) {
		return defaultTrainingLocale;
	}

	return supportedLocales.includes(locale as LocaleCode) ? (locale as LocaleCode) : defaultTrainingLocale;
}
