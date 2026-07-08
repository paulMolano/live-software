import type { AuthenticatedUser } from '@live-software/contracts';

export type AuthenticatedRequest = {
	headers?: Record<string, string | string[] | undefined>;
	user?: AuthenticatedUser;
};
