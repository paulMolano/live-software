export type AuthenticatedUser = {
	id: string;
	roles: string[];
	username?: string;
	email?: string;
	name?: string;
};
