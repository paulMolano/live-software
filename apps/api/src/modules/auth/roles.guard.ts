import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { UserRole } from '@live-software/contracts';

import type { AuthenticatedRequest } from './authenticated-request.js';
import { rolesMetadataKey } from './roles.decorator.js';

@Injectable()
export class RolesGuard implements CanActivate {
	public constructor(private readonly reflector: Reflector) {}

	public canActivate(context: ExecutionContext): boolean {
		const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(rolesMetadataKey, [
			context.getHandler(),
			context.getClass(),
		]);

		if (!requiredRoles || requiredRoles.length === 0) {
			return true;
		}

		const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
		const assignedRoles = (request.user?.roles ?? []).map((role) => role.toLowerCase());
		const hasRequiredRole = requiredRoles
			.map((role) => role.toLowerCase())
			.some((requiredRole) => assignedRoles.includes(requiredRole));

		if (!hasRequiredRole) {
			throw new ForbiddenException('Insufficient role to perform this action.');
		}

		return true;
	}
}
