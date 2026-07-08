import { prescriptionEvidenceReferences } from '../evidence-references.seed.js';
import type { SeedExercise } from '../training-seed.types.js';

export const upperBodyExercises = [
	{
		slug: 'barbell-bench-press',
		translations: [
			{
				locale: 'EN',
				name: 'Barbell bench press',
				aliases: ['Bench press'],
				summary: 'Horizontal push pattern with high chest involvement and meaningful triceps contribution.',
				description:
					'A common upper-body compound press. Its outcome depends on prescription variables rather than on the exercise name alone.',
			},
			{
				locale: 'ES',
				name: 'Press banca con barra',
				aliases: ['Press banca'],
				summary: 'Patron de empuje horizontal con alta implicacion del pectoral y contribucion relevante del triceps.',
				description:
					'Empuje compuesto comun de tren superior. Su resultado depende de variables de prescripcion, no solo del nombre del ejercicio.',
			},
		],
		difficulty: 'INTERMEDIATE',
		mechanics: 'COMPOUND',
		movementPattern: 'HORIZONTAL_PUSH',
		laterality: 'BILATERAL',
		kineticChain: 'OPEN',
		resistanceCurve: 'CONSTANT',
		technicalDemand: 'MEDIUM',
		mobilityDemand: 'MEDIUM',
		stabilityDemand: 'MEDIUM',
		axialLoad: 'LOW',
		lumbarDemand: 'LOW',
		shoulderDemand: 'MEDIUM',
		kneeDemand: 'LOW',
		setupComplexity: 'MEDIUM',
		spaceRequirement: 'MEDIUM',
		requiresSpotter: true,
		gymRequired: true,
		homeFriendly: false,
		muscles: [
			{ slug: 'pectoralis-major', role: 'PRIMARY', stimulusLevel: 'HIGH' },
			{ slug: 'triceps', role: 'SECONDARY', stimulusLevel: 'MEDIUM' },
			{ slug: 'anterior-deltoid', role: 'SECONDARY', stimulusLevel: 'MEDIUM' },
			{ slug: 'middle-back', role: 'STABILIZER', stimulusLevel: 'LOW' },
		],
		equipment: [
			{ slug: 'barbell', requirement: 'REQUIRED' },
			{ slug: 'weight-plates', requirement: 'REQUIRED' },
			{ slug: 'flat-bench', requirement: 'REQUIRED' },
		],
		tips: [
			{
				type: 'SETUP',
				sortOrder: 1,
				translations: [
					{ locale: 'EN', text: 'Set a stable upper back and keep feet planted before unracking.' },
					{ locale: 'ES', text: 'Fija una espalda alta estable y mantiene los pies apoyados antes de sacar la barra.' },
				],
			},
			{
				type: 'CUE',
				sortOrder: 2,
				translations: [
					{ locale: 'EN', text: 'Lower the bar under control and press without losing shoulder position.' },
					{ locale: 'ES', text: 'Baja la barra con control y empuja sin perder la posicion del hombro.' },
				],
			},
			{
				type: 'SAFETY',
				sortOrder: 3,
				translations: [
					{ locale: 'EN', text: 'Use a spotter or safeties when sets may approach failure.' },
					{ locale: 'ES', text: 'Usa ayuda o seguros cuando las series puedan acercarse al fallo.' },
				],
			},
		],
		references: prescriptionEvidenceReferences,
	},
	{
		slug: 'pull-up',
		translations: [
			{
				locale: 'EN',
				name: 'Pull-up',
				aliases: ['Strict pull-up'],
				summary: 'Bodyweight vertical pull with high lat involvement and trunk control demands.',
				description:
					'A bodyweight pull where relative strength and control matter. Assistance or loading changes the prescription, not the exercise identity.',
			},
			{
				locale: 'ES',
				name: 'Dominada',
				aliases: ['Dominada estricta'],
				summary: 'Traccion vertical con peso corporal, alta implicacion dorsal y demanda de control del tronco.',
				description:
					'Traccion con peso corporal donde importan fuerza relativa y control. La asistencia o carga cambia la prescripcion, no la identidad del ejercicio.',
			},
		],
		difficulty: 'ADVANCED',
		mechanics: 'COMPOUND',
		movementPattern: 'VERTICAL_PULL',
		laterality: 'BILATERAL',
		kineticChain: 'CLOSED',
		resistanceCurve: 'BODYWEIGHT_VARIABLE',
		technicalDemand: 'MEDIUM',
		mobilityDemand: 'MEDIUM',
		stabilityDemand: 'MEDIUM',
		axialLoad: 'LOW',
		lumbarDemand: 'LOW',
		shoulderDemand: 'MEDIUM',
		kneeDemand: 'LOW',
		setupComplexity: 'LOW',
		spaceRequirement: 'LOW',
		requiresSpotter: false,
		gymRequired: false,
		homeFriendly: true,
		muscles: [
			{ slug: 'latissimus-dorsi', role: 'PRIMARY', stimulusLevel: 'HIGH' },
			{ slug: 'middle-back', role: 'SECONDARY', stimulusLevel: 'MEDIUM' },
			{ slug: 'biceps', role: 'SECONDARY', stimulusLevel: 'MEDIUM' },
			{ slug: 'rectus-abdominis', role: 'STABILIZER', stimulusLevel: 'LOW' },
		],
		equipment: [
			{ slug: 'bodyweight', requirement: 'REQUIRED' },
			{ slug: 'pull-up-bar', requirement: 'REQUIRED' },
		],
		tips: [
			{
				type: 'SETUP',
				sortOrder: 1,
				translations: [
					{ locale: 'EN', text: 'Start from a controlled hang with active shoulder position.' },
					{ locale: 'ES', text: 'Empieza desde una suspension controlada con hombros activos.' },
				],
			},
			{
				type: 'CUE',
				sortOrder: 2,
				translations: [
					{ locale: 'EN', text: 'Pull the elbows down rather than only trying to lift the chin.' },
					{ locale: 'ES', text: 'Tira de los codos hacia abajo en vez de buscar solo subir la barbilla.' },
				],
			},
			{
				type: 'PROGRESSION',
				sortOrder: 3,
				translations: [
					{ locale: 'EN', text: 'Use assistance when full-range reps are not yet controlled.' },
					{ locale: 'ES', text: 'Usa asistencia si aun no controlas repeticiones completas.' },
				],
			},
		],
		references: prescriptionEvidenceReferences,
	},
	{
		slug: 'seated-cable-row',
		translations: [
			{
				locale: 'EN',
				name: 'Seated cable row',
				aliases: ['Cable row'],
				summary: 'Horizontal pull pattern with externally guided resistance and moderate setup demands.',
				description:
					'A cable-based row useful for describing equipment constraints separately from muscular involvement.',
			},
			{
				locale: 'ES',
				name: 'Remo sentado en polea',
				aliases: ['Remo en polea'],
				summary: 'Patron de traccion horizontal con resistencia guiada y demanda moderada de preparacion.',
				description:
					'Remo en polea util para describir restricciones de equipamiento separadas de la implicacion muscular.',
			},
		],
		difficulty: 'BEGINNER',
		mechanics: 'COMPOUND',
		movementPattern: 'HORIZONTAL_PULL',
		laterality: 'BILATERAL',
		kineticChain: 'OPEN',
		resistanceCurve: 'CONSTANT',
		technicalDemand: 'MEDIUM',
		mobilityDemand: 'LOW',
		stabilityDemand: 'MEDIUM',
		axialLoad: 'LOW',
		lumbarDemand: 'MEDIUM',
		shoulderDemand: 'MEDIUM',
		kneeDemand: 'LOW',
		setupComplexity: 'MEDIUM',
		spaceRequirement: 'LOW',
		requiresSpotter: false,
		gymRequired: true,
		homeFriendly: false,
		muscles: [
			{ slug: 'latissimus-dorsi', role: 'PRIMARY', stimulusLevel: 'HIGH' },
			{ slug: 'middle-back', role: 'PRIMARY', stimulusLevel: 'HIGH' },
			{ slug: 'posterior-deltoid', role: 'SECONDARY', stimulusLevel: 'MEDIUM' },
			{ slug: 'biceps', role: 'SECONDARY', stimulusLevel: 'MEDIUM' },
			{ slug: 'erector-spinae', role: 'STABILIZER', stimulusLevel: 'LOW' },
		],
		equipment: [
			{ slug: 'cable-row-station', requirement: 'REQUIRED' },
		],
		tips: [
			{
				type: 'SETUP',
				sortOrder: 1,
				translations: [
					{ locale: 'EN', text: 'Choose a handle that allows controlled shoulder position.' },
					{ locale: 'ES', text: 'Elige un agarre que permita controlar la posicion del hombro.' },
				],
			},
			{
				type: 'CUE',
				sortOrder: 2,
				translations: [
					{ locale: 'EN', text: 'Row by driving elbows back without turning the movement into a lower-back swing.' },
					{ locale: 'ES', text: 'Rema llevando los codos atras sin convertirlo en un balanceo lumbar.' },
				],
			},
			{
				type: 'COMMON_MISTAKE',
				sortOrder: 3,
				translations: [
					{ locale: 'EN', text: 'Avoid chasing range by rounding aggressively through the spine.' },
					{ locale: 'ES', text: 'Evita ganar recorrido redondeando agresivamente la columna.' },
				],
			},
		],
		references: prescriptionEvidenceReferences,
	},
] as const satisfies readonly SeedExercise[];
