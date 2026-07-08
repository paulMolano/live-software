import type { AuthenticatedUser } from './user.js';

export type AuthSessionResponse = {
	data: AuthenticatedUser;
};
