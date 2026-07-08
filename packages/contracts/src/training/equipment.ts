import type { EquipmentCategory, EquipmentRequirement } from './enums.js';

export type Equipment = {
	id: string;
	slug: string;
	name: string;
	category: EquipmentCategory;
};

export type ExerciseEquipment = {
	equipment: Equipment;
	requirement: EquipmentRequirement;
};
