import type { SeedMuscleGroup } from './training-seed.types.js';

export const muscleGroupCatalog = [
	{ slug: 'quadriceps', region: 'LOWER_BODY', translations: [{ locale: 'EN', name: 'Quadriceps' }, { locale: 'ES', name: 'Cuadriceps' }] },
	{ slug: 'gluteus-maximus', region: 'LOWER_BODY', translations: [{ locale: 'EN', name: 'Gluteus maximus' }, { locale: 'ES', name: 'Gluteo mayor' }] },
	{ slug: 'hamstrings', region: 'LOWER_BODY', translations: [{ locale: 'EN', name: 'Hamstrings' }, { locale: 'ES', name: 'Isquiosurales' }] },
	{ slug: 'erector-spinae', region: 'CORE', translations: [{ locale: 'EN', name: 'Erector spinae' }, { locale: 'ES', name: 'Erectores espinales' }] },
	{ slug: 'rectus-abdominis', region: 'CORE', translations: [{ locale: 'EN', name: 'Rectus abdominis' }, { locale: 'ES', name: 'Recto abdominal' }] },
	{ slug: 'obliques', region: 'CORE', translations: [{ locale: 'EN', name: 'Obliques' }, { locale: 'ES', name: 'Oblicuos' }] },
	{ slug: 'latissimus-dorsi', region: 'UPPER_BODY', translations: [{ locale: 'EN', name: 'Latissimus dorsi' }, { locale: 'ES', name: 'Dorsal ancho' }] },
	{ slug: 'middle-back', region: 'UPPER_BODY', translations: [{ locale: 'EN', name: 'Middle back' }, { locale: 'ES', name: 'Espalda media' }] },
	{ slug: 'pectoralis-major', region: 'UPPER_BODY', translations: [{ locale: 'EN', name: 'Pectoralis major' }, { locale: 'ES', name: 'Pectoral mayor' }] },
	{ slug: 'triceps', region: 'UPPER_BODY', translations: [{ locale: 'EN', name: 'Triceps' }, { locale: 'ES', name: 'Triceps' }] },
	{ slug: 'biceps', region: 'UPPER_BODY', translations: [{ locale: 'EN', name: 'Biceps' }, { locale: 'ES', name: 'Biceps' }] },
	{ slug: 'anterior-deltoid', region: 'UPPER_BODY', translations: [{ locale: 'EN', name: 'Anterior deltoid' }, { locale: 'ES', name: 'Deltoides anterior' }] },
	{ slug: 'posterior-deltoid', region: 'UPPER_BODY', translations: [{ locale: 'EN', name: 'Posterior deltoid' }, { locale: 'ES', name: 'Deltoides posterior' }] },
] as const satisfies readonly SeedMuscleGroup[];
