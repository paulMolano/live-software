import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import type { Exercise, GetExerciseByIdResponse, GetExercisesResponse } from '@live-software/contracts';

import { TrainingExercisesController } from '../src/modules/training/training-exercises.controller.js';
import { TrainingExercisesService } from '../src/modules/training/training-exercises.service.js';
import { normalizeTrainingLocale } from '../src/modules/training/training-locale.js';

const exercise: Exercise = {
	id: 'exercise-1',
	slug: 'barbell-back-squat',
	locale: 'es',
	name: 'Sentadilla trasera con barra',
	aliases: ['Sentadilla con barra'],
	summary: 'Patron bilateral de sentadilla con alta demanda de tren inferior.',
	difficulty: 'intermediate',
	biomechanics: {
		mechanics: 'compound',
		movementPattern: 'squat',
		laterality: 'bilateral',
		kineticChain: 'closed',
		resistanceCurve: 'constant',
	},
	demandProfile: {
		technical: 'high',
		mobility: 'high',
		stability: 'high',
		axialLoad: 'high',
		lumbar: 'medium',
		shoulder: 'low',
		knee: 'high',
		setupComplexity: 'medium',
		spaceRequirement: 'medium',
	},
	context: {
		requiresSpotter: true,
		gymRequired: true,
		homeFriendly: false,
	},
	primaryMuscles: [
		{
			muscleGroup: {
				id: 'muscle-1',
				slug: 'quadriceps',
				name: 'Cuadriceps',
				region: 'lower_body',
			},
			role: 'primary',
			stimulusLevel: 'high',
		},
	],
	equipment: [
		{
			equipment: {
				id: 'equipment-1',
				slug: 'barbell',
				name: 'Barra',
				category: 'free_weight',
			},
			requirement: 'required',
		},
	],
	description: 'Descripcion localizada del ejercicio.',
	muscles: [
		{
			muscleGroup: {
				id: 'muscle-1',
				slug: 'quadriceps',
				name: 'Cuadriceps',
				region: 'lower_body',
			},
			role: 'primary',
			stimulusLevel: 'high',
		},
	],
	tips: [
		{
			id: 'tip-1',
			type: 'setup',
			text: 'Coloca la barra con seguridad.',
			sortOrder: 1,
		},
	],
	media: [],
	references: [
		{
			id: 'reference-1',
			sourceType: 'peer_reviewed_review',
			title: 'Loading Recommendations for Muscle Strength, Hypertrophy, and Local Endurance',
			url: 'https://doi.org/10.3390/sports9020032',
			sortOrder: 1,
		},
	],
	createdAt: '2026-07-08T00:00:00.000Z',
	updatedAt: '2026-07-08T00:00:00.000Z',
};

const listResponse: GetExercisesResponse = {
	data: [exercise],
};

const detailResponse: GetExerciseByIdResponse = {
	data: exercise,
};

describe('TrainingExercisesController', () => {
	it('returns localized exercise list responses', async () => {
		const controller = new TrainingExercisesController({
			findAll: async (locale?: string) => {
				assert.equal(locale, 'es');

				return listResponse;
			},
		} as unknown as TrainingExercisesService);

		assert.deepEqual(await controller.getExercises('es'), listResponse);
	});

	it('returns localized exercise detail responses by slug', async () => {
		const controller = new TrainingExercisesController({
			findById: async (idOrSlug: string, locale?: string) => {
				assert.equal(idOrSlug, 'barbell-back-squat');
				assert.equal(locale, 'es');

				return detailResponse;
			},
		} as unknown as TrainingExercisesService);

		assert.deepEqual(await controller.getExerciseById('barbell-back-squat', 'es'), detailResponse);
	});
});

describe('normalizeTrainingLocale', () => {
	it('uses English as default and fallback locale', () => {
		assert.equal(normalizeTrainingLocale(undefined), 'en');
		assert.equal(normalizeTrainingLocale('fr'), 'en');
	});

	it('keeps supported locales', () => {
		assert.equal(normalizeTrainingLocale('es'), 'es');
		assert.equal(normalizeTrainingLocale('en'), 'en');
	});
});
