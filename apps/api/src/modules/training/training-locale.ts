import type { LocaleCode } from '@live-software/contracts';
import { supportedLocales } from '@live-software/contracts';

export const defaultTrainingLocale: LocaleCode = 'en';

function isLocaleCode(value: string): value is LocaleCode {
	return supportedLocales.some((locale) => locale === value);
}

export function normalizeTrainingLocale(locale: string | undefined): LocaleCode {
	if (locale === undefined) {
		return defaultTrainingLocale;
	}

	return isLocaleCode(locale) ? locale : defaultTrainingLocale;
}
