import { prescriptionEvidenceReferences } from '../evidence-references.seed.js';
import type { SeedExercise } from '../training-seed.types.js';

export const coreExercises = [
	{
		slug: 'front-plank',
		translations: [
			{
				locale: 'EN',
				name: 'Front plank',
				aliases: ['Plank'],
				summary: 'Bodyweight anti-extension core exercise with low equipment requirements.',
				description:
					'A static core exercise where duration, bracing quality and progression define the training dose.',
			},
			{
				locale: 'ES',
				name: 'Plancha frontal',
				aliases: ['Plancha'],
				summary: 'Ejercicio de core anti-extension con peso corporal y baja necesidad de equipamiento.',
				description:
					'Ejercicio estatico de core donde duracion, calidad de braceo y progresion definen la dosis de entrenamiento.',
			},
		],
		difficulty: 'BEGINNER',
		mechanics: 'ISOLATION',
		movementPattern: 'CORE',
		laterality: 'BILATERAL',
		kineticChain: 'CLOSED',
		resistanceCurve: 'BODYWEIGHT_VARIABLE',
		technicalDemand: 'LOW',
		mobilityDemand: 'LOW',
		stabilityDemand: 'MEDIUM',
		axialLoad: 'LOW',
		lumbarDemand: 'MEDIUM',
		shoulderDemand: 'LOW',
		kneeDemand: 'LOW',
		setupComplexity: 'LOW',
		spaceRequirement: 'LOW',
		requiresSpotter: false,
		gymRequired: false,
		homeFriendly: true,
		muscles: [
			{ slug: 'rectus-abdominis', role: 'PRIMARY', stimulusLevel: 'MEDIUM' },
			{ slug: 'obliques', role: 'SECONDARY', stimulusLevel: 'MEDIUM' },
			{ slug: 'gluteus-maximus', role: 'STABILIZER', stimulusLevel: 'LOW' },
		],
		equipment: [
			{ slug: 'bodyweight', requirement: 'REQUIRED' },
		],
		tips: [
			{
				type: 'SETUP',
				sortOrder: 1,
				translations: [
					{ locale: 'EN', text: 'Set elbows under shoulders and create a straight line from ribs to pelvis.' },
					{ locale: 'ES', text: 'Coloca los codos bajo los hombros y crea una linea estable de costillas a pelvis.' },
				],
			},
			{
				type: 'CUE',
				sortOrder: 2,
				translations: [
					{ locale: 'EN', text: 'Brace as if resisting spinal extension rather than simply waiting out the clock.' },
					{ locale: 'ES', text: 'Bracea como si resistieras extension lumbar, no solo esperando a que pase el tiempo.' },
				],
			},
			{
				type: 'PROGRESSION',
				sortOrder: 3,
				translations: [
					{ locale: 'EN', text: 'Progress by changing leverage before adding excessive duration.' },
					{ locale: 'ES', text: 'Progresa cambiando la palanca antes de anadir duraciones excesivas.' },
				],
			},
		],
		references: prescriptionEvidenceReferences,
	},
] as const satisfies readonly SeedExercise[];
