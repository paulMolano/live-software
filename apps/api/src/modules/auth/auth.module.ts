import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { JwtAuthGuard } from './jwt-auth.guard.js';
import { JwtVerifierService } from './jwt-verifier.service.js';

@Module({
	controllers: [AuthController],
	providers: [JwtAuthGuard, JwtVerifierService],
	exports: [JwtAuthGuard, JwtVerifierService],
})
export class AuthModule {}
