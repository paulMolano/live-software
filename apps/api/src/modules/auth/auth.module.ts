import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { JwtAuthGuard } from './jwt-auth.guard.js';
import { JwtVerifierService } from './jwt-verifier.service.js';
import { RolesGuard } from './roles.guard.js';

@Module({
	controllers: [AuthController],
	providers: [JwtAuthGuard, JwtVerifierService, RolesGuard],
	exports: [JwtAuthGuard, JwtVerifierService, RolesGuard],
})
export class AuthModule {}
