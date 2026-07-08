import { prescriptionEvidenceReferences } from '../evidence-references.seed.js';
import type { SeedExercise } from '../training-seed.types.js';

export const lowerBodyExercises = [
	{
		slug: 'barbell-back-squat',
		translations: [
			{
				locale: 'EN',
				name: 'Barbell back squat',
				aliases: ['Back squat'],
				summary: 'Bilateral squat pattern with high lower-body and trunk stabilization demands.',
				description:
					'A foundational squat variation. The exercise description is biomechanical, not a fixed training stimulus; load, reps, effort and volume determine the final adaptation.',
			},
			{
				locale: 'ES',
				name: 'Sentadilla trasera con barra',
				aliases: ['Sentadilla con barra'],
				summary: 'Patron bilateral de sentadilla con alta demanda de tren inferior y estabilizacion del tronco.',
				description:
					'Variacion fundamental de sentadilla. La descripcion del ejercicio es biomecanica, no un estimulo fijo; carga, repeticiones, esfuerzo y volumen determinan la adaptacion final.',
			},
		],
		difficulty: 'INTERMEDIATE',
		mechanics: 'COMPOUND',
		movementPattern: 'SQUAT',
		laterality: 'BILATERAL',
		kineticChain: 'CLOSED',
		resistanceCurve: 'CONSTANT',
		technicalDemand: 'HIGH',
		mobilityDemand: 'HIGH',
		stabilityDemand: 'HIGH',
		axialLoad: 'HIGH',
		lumbarDemand: 'MEDIUM',
		shoulderDemand: 'LOW',
		kneeDemand: 'HIGH',
		setupComplexity: 'MEDIUM',
		spaceRequirement: 'MEDIUM',
		requiresSpotter: true,
		gymRequired: true,
		homeFriendly: false,
		muscles: [
			{ slug: 'quadriceps', role: 'PRIMARY', stimulusLevel: 'HIGH' },
			{ slug: 'gluteus-maximus', role: 'SECONDARY', stimulusLevel: 'HIGH' },
			{ slug: 'hamstrings', role: 'SECONDARY', stimulusLevel: 'MEDIUM' },
			{ slug: 'erector-spinae', role: 'STABILIZER', stimulusLevel: 'MEDIUM' },
			{ slug: 'rectus-abdominis', role: 'STABILIZER', stimulusLevel: 'MEDIUM' },
		],
		equipment: [
			{ slug: 'barbell', requirement: 'REQUIRED' },
			{ slug: 'weight-plates', requirement: 'REQUIRED' },
			{ slug: 'squat-rack', requirement: 'REQUIRED' },
		],
		tips: [
			{
				type: 'SETUP',
				sortOrder: 1,
				translations: [
					{ locale: 'EN', text: 'Set the bar securely before unracking and create a stable stance.' },
					{ locale: 'ES', text: 'Coloca la barra con seguridad antes de sacarla y crea una base estable.' },
				],
			},
			{
				type: 'CUE',
				sortOrder: 2,
				translations: [
					{ locale: 'EN', text: 'Keep pressure through the mid-foot while knees and hips move together.' },
					{ locale: 'ES', text: 'Mantén presion en el medio del pie mientras rodillas y caderas se mueven juntas.' },
				],
			},
			{
				type: 'SAFETY',
				sortOrder: 3,
				translations: [
					{ locale: 'EN', text: 'Use safeties or a spotter when loading near technical limits.' },
					{ locale: 'ES', text: 'Usa seguros o ayuda cuando cargues cerca del limite tecnico.' },
				],
			},
		],
		references: prescriptionEvidenceReferences,
	},
	{
		slug: 'barbell-romanian-deadlift',
		translations: [
			{
				locale: 'EN',
				name: 'Barbell Romanian deadlift',
				aliases: ['RDL'],
				summary: 'Hip hinge pattern with high hamstring and posterior-chain demands.',
				description:
					'A hinge variation that emphasizes controlled hip flexion and extension. It describes a movement pattern, not a fixed rep range.',
			},
			{
				locale: 'ES',
				name: 'Peso muerto rumano con barra',
				aliases: ['RDL'],
				summary: 'Patron de bisagra de cadera con alta demanda de isquiosurales y cadena posterior.',
				description:
					'Variacion de bisagra que enfatiza flexion y extension de cadera controladas. Describe un patron de movimiento, no un rango fijo de repeticiones.',
			},
		],
		difficulty: 'INTERMEDIATE',
		mechanics: 'COMPOUND',
		movementPattern: 'HINGE',
		laterality: 'BILATERAL',
		kineticChain: 'CLOSED',
		resistanceCurve: 'CONSTANT',
		technicalDemand: 'HIGH',
		mobilityDemand: 'MEDIUM',
		stabilityDemand: 'HIGH',
		axialLoad: 'MEDIUM',
		lumbarDemand: 'HIGH',
		shoulderDemand: 'LOW',
		kneeDemand: 'LOW',
		setupComplexity: 'LOW',
		spaceRequirement: 'MEDIUM',
		requiresSpotter: false,
		gymRequired: true,
		homeFriendly: false,
		muscles: [
			{ slug: 'hamstrings', role: 'PRIMARY', stimulusLevel: 'HIGH' },
			{ slug: 'gluteus-maximus', role: 'SECONDARY', stimulusLevel: 'HIGH' },
			{ slug: 'erector-spinae', role: 'STABILIZER', stimulusLevel: 'HIGH' },
			{ slug: 'latissimus-dorsi', role: 'STABILIZER', stimulusLevel: 'LOW' },
		],
		equipment: [
			{ slug: 'barbell', requirement: 'REQUIRED' },
			{ slug: 'weight-plates', requirement: 'REQUIRED' },
		],
		tips: [
			{
				type: 'CUE',
				sortOrder: 1,
				translations: [
					{ locale: 'EN', text: 'Move the hips back while keeping the bar close.' },
					{ locale: 'ES', text: 'Lleva la cadera atras manteniendo la barra cerca.' },
				],
			},
			{
				type: 'COMMON_MISTAKE',
				sortOrder: 2,
				translations: [
					{ locale: 'EN', text: 'Avoid turning the hinge into a squat by driving the knees too far forward.' },
					{ locale: 'ES', text: 'Evita convertir la bisagra en sentadilla llevando demasiado las rodillas hacia delante.' },
				],
			},
			{
				type: 'SAFETY',
				sortOrder: 3,
				translations: [
					{ locale: 'EN', text: 'Keep the range controlled when lumbar position cannot be maintained.' },
					{ locale: 'ES', text: 'Mantén un rango controlado cuando no puedas conservar la posicion lumbar.' },
				],
			},
		],
		references: prescriptionEvidenceReferences,
	},
] as const satisfies readonly SeedExercise[];
