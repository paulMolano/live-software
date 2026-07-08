import { Controller, Get, UseGuards } from '@nestjs/common';
import type { AuthSessionResponse, AuthenticatedUser } from '@live-software/contracts';
import { CurrentUser } from './current-user.decorator.js';
import { JwtAuthGuard } from './jwt-auth.guard.js';

@Controller('api/auth')
export class AuthController {
	@Get('session')
	@UseGuards(JwtAuthGuard)
	public getSession(
		@CurrentUser() user: AuthenticatedUser,
	): AuthSessionResponse {
		return { data: user };
	}
}
