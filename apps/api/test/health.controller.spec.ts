import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { HealthController } from '../src/health/health.controller.js';

describe('HealthController', () => {
	it('returns an ok payload', () => {
		const controller = new HealthController();

		assert.deepEqual(controller.getHealth(), { status: 'ok' });
	});
});
