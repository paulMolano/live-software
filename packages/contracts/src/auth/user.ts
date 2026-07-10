import type { UserRole } from './roles.js';

export type AuthenticatedUser = {
	id: string;
	roles: UserRole[];
	username?: string;
	email?: string;
	name?: string;
};
