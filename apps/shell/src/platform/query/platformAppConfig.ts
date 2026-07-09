import type { PlatformAppConfigDto } from '@live-software/contracts';

let platformAppConfigFetchCount = 0;

export async function getPlatformAppConfig(): Promise<PlatformAppConfigDto> {
	platformAppConfigFetchCount += 1;

	return new Promise((resolve) => {
		window.setTimeout(() => {
			resolve({
				appMode: 'personal-life-dashboard',
				dashboardRangeDefault: '30d',
				enabledDomains: ['training', 'finance'],
				debug: {
					fetchCount: platformAppConfigFetchCount,
					fetchedAt: new Date().toISOString(),
				},
			});
		}, 120);
	});
}

