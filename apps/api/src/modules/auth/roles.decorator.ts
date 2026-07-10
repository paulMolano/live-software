import { SetMetadata } from '@nestjs/common';
import type { UserRole } from '@live-software/contracts';

export const rolesMetadataKey = 'roles';

export function Roles(...roles: UserRole[]): ReturnType<typeof SetMetadata<UserRole[]>> {
	return SetMetadata(rolesMetadataKey, roles);
}
