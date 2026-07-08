import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import type { AuthenticatedUser } from '@live-software/contracts';
import { AuthController } from '../src/modules/auth/auth.controller.js';

describe('AuthController', () => {
	it('returns the current authenticated user session', () => {
		const controller = new AuthController();
		const user: AuthenticatedUser = {
			id: 'user-1',
			roles: ['default-roles-live-software'],
			username: 'paul',
			email: 'paul@example.com',
			name: 'Paul',
		};

		assert.deepEqual(controller.getSession(user), { data: user });
	});
});
