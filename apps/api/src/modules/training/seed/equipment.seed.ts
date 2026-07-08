import type { SeedEquipment } from './training-seed.types.js';

export const equipmentCatalog = [
	{ slug: 'bodyweight', category: 'BODYWEIGHT', translations: [{ locale: 'EN', name: 'Bodyweight' }, { locale: 'ES', name: 'Peso corporal' }] },
	{ slug: 'barbell', category: 'FREE_WEIGHT', translations: [{ locale: 'EN', name: 'Barbell' }, { locale: 'ES', name: 'Barra' }] },
	{ slug: 'weight-plates', category: 'FREE_WEIGHT', translations: [{ locale: 'EN', name: 'Weight plates' }, { locale: 'ES', name: 'Discos' }] },
	{ slug: 'squat-rack', category: 'SUPPORT', translations: [{ locale: 'EN', name: 'Squat rack' }, { locale: 'ES', name: 'Rack de sentadilla' }] },
	{ slug: 'flat-bench', category: 'SUPPORT', translations: [{ locale: 'EN', name: 'Flat bench' }, { locale: 'ES', name: 'Banco plano' }] },
	{ slug: 'pull-up-bar', category: 'SUPPORT', translations: [{ locale: 'EN', name: 'Pull-up bar' }, { locale: 'ES', name: 'Barra de dominadas' }] },
	{ slug: 'cable-row-station', category: 'CABLE', translations: [{ locale: 'EN', name: 'Cable row station' }, { locale: 'ES', name: 'Estacion de remo en polea' }] },
] as const satisfies readonly SeedEquipment[];
