export const knownRoles = ['admin'] as const;

export type KnownRole = (typeof knownRoles)[number];

export type UserRole = KnownRole | (string & {});

export const adminRole: KnownRole = 'admin';
