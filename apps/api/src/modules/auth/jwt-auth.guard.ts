import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtVerifierService } from './jwt-verifier.service.js';
import type { AuthenticatedRequest } from './authenticated-request.js';

function readBearerToken(headers: Record<string, string | string[] | undefined>): string {
	const header = headers['authorization'] ?? headers['Authorization'];
	const value = Array.isArray(header) ? header[0] : header;

	if (!value?.startsWith('Bearer ')) {
		throw new UnauthorizedException('Missing bearer token.');
	}

	return value.slice('Bearer '.length).trim();
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
	public constructor(private readonly jwtVerifier: JwtVerifierService) {}

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
		const token = readBearerToken(request.headers ?? {});
		request.user = await this.jwtVerifier.verify(token);
		return true;
	}
}
