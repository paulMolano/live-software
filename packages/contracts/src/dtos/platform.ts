import type { TrainingRange } from './training.js';

export type PlatformDomain = 'training' | 'finance';

export type QueryDebugDto = {
	fetchCount: number;
	fetchedAt: string;
};

export type PlatformAppConfigDto = {
	appMode: 'personal-life-dashboard';
	dashboardRangeDefault: TrainingRange;
	enabledDomains: PlatformDomain[];
	debug: QueryDebugDto;
};

