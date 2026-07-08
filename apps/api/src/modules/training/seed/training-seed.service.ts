import type { DatabaseService } from '../../../shared/database/database.service.js';
import { equipmentCatalog } from './equipment.seed.js';
import { exerciseCatalog } from './exercises/index.js';
import { muscleGroupCatalog } from './muscle-groups.seed.js';

export async function seedTrainingExercisesIfEmpty(database: DatabaseService): Promise<void> {
	const exerciseCount = await database.exercise.count();

	if (exerciseCount > 0) {
		return;
	}

	for (const muscleGroup of muscleGroupCatalog) {
		const savedMuscleGroup = await database.muscleGroup.upsert({
			where: { slug: muscleGroup.slug },
			update: {
				region: muscleGroup.region,
			},
			create: {
				slug: muscleGroup.slug,
				region: muscleGroup.region,
			},
		});

		for (const translation of muscleGroup.translations) {
			await database.muscleGroupTranslation.upsert({
				where: {
					muscleGroupId_locale: {
						muscleGroupId: savedMuscleGroup.id,
						locale: translation.locale,
					},
				},
				update: {
					name: translation.name,
				},
				create: {
					muscleGroupId: savedMuscleGroup.id,
					locale: translation.locale,
					name: translation.name,
				},
			});
		}
	}

	for (const equipmentItem of equipmentCatalog) {
		const savedEquipment = await database.equipment.upsert({
			where: { slug: equipmentItem.slug },
			update: {
				category: equipmentItem.category,
			},
			create: {
				slug: equipmentItem.slug,
				category: equipmentItem.category,
			},
		});

		for (const translation of equipmentItem.translations) {
			await database.equipmentTranslation.upsert({
				where: {
					equipmentId_locale: {
						equipmentId: savedEquipment.id,
						locale: translation.locale,
					},
				},
				update: {
					name: translation.name,
				},
				create: {
					equipmentId: savedEquipment.id,
					locale: translation.locale,
					name: translation.name,
				},
			});
		}
	}

	for (const exercise of exerciseCatalog) {
		const { translations, muscles, equipment, tips, references, ...exerciseData } = exercise;

		await database.exercise.create({
			data: {
				...exerciseData,
				translations: {
					create: translations.map((translation) => ({
						...translation,
						aliases: [...translation.aliases],
					})),
				},
				muscles: {
					create: muscles.map((muscle) => ({
						role: muscle.role,
						stimulusLevel: muscle.stimulusLevel,
						...(muscle.notes === undefined ? {} : { notes: muscle.notes }),
						muscleGroup: {
							connect: {
								slug: muscle.slug,
							},
						},
					})),
				},
				equipment: {
					create: equipment.map((equipmentItem) => ({
						requirement: equipmentItem.requirement,
						equipment: {
							connect: {
								slug: equipmentItem.slug,
							},
						},
					})),
				},
				tips: {
					create: tips.map((tip) => ({
						type: tip.type,
						sortOrder: tip.sortOrder,
						translations: {
							create: tip.translations.map((translation) => ({ ...translation })),
						},
					})),
				},
				references: {
					create: references.map((reference) => ({ ...reference })),
				},
			},
		});
	}
}
