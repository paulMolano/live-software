import type { Exercise, ExerciseEvidenceReference, ExerciseListItem, LocaleCode } from '@live-software/contracts';

import type { ExerciseRecord } from './training-exercise-record.js';
import { defaultTrainingLocale } from './training-locale.js';
import {
	toContractBodyRegion,
	toContractDemandLevel,
	toContractDifficulty,
	toContractEquipmentCategory,
	toContractEquipmentRequirement,
	toContractEvidenceSourceType,
	toContractKineticChain,
	toContractLaterality,
	toContractLocale,
	toContractMechanics,
	toContractMediaKind,
	toContractMovementPattern,
	toContractMuscleRole,
	toContractResistanceCurve,
	toContractStimulusLevel,
	toContractTipType,
} from './training-enum.mapper.js';

type LocalizedRecord = {
	locale: string;
};

function findLocalizedRecord<TRecord extends LocalizedRecord>(
	records: TRecord[],
	locale: LocaleCode,
	entityName: string,
): TRecord {
	const localizedRecord = records.find((record) => toContractLocale(record.locale) === locale)
		?? records.find((record) => toContractLocale(record.locale) === defaultTrainingLocale)
		?? records[0];

	if (localizedRecord === undefined) {
		throw new Error(`Missing ${entityName} translation`);
	}

	return localizedRecord;
}

function toExerciseMuscle(record: ExerciseRecord['muscles'][number], locale: LocaleCode): Exercise['muscles'][number] {
	const translation = findLocalizedRecord(record.muscleGroup.translations, locale, record.muscleGroup.slug);

	return {
		muscleGroup: {
			id: record.muscleGroup.id,
			slug: record.muscleGroup.slug,
			name: translation.name,
			region: toContractBodyRegion(record.muscleGroup.region),
		},
		role: toContractMuscleRole(record.role),
		stimulusLevel: toContractStimulusLevel(record.stimulusLevel),
		...(record.notes === null ? {} : { notes: record.notes }),
	};
}

function toExerciseEquipment(record: ExerciseRecord['equipment'][number], locale: LocaleCode): Exercise['equipment'][number] {
	const translation = findLocalizedRecord(record.equipment.translations, locale, record.equipment.slug);

	return {
		equipment: {
			id: record.equipment.id,
			slug: record.equipment.slug,
			name: translation.name,
			category: toContractEquipmentCategory(record.equipment.category),
		},
		requirement: toContractEquipmentRequirement(record.requirement),
	};
}

function toExerciseReference(record: ExerciseRecord['references'][number]): ExerciseEvidenceReference {
	return {
		id: record.id,
		sourceType: toContractEvidenceSourceType(record.sourceType),
		title: record.title,
		...(record.citation === null ? {} : { citation: record.citation }),
		...(record.url === null ? {} : { url: record.url }),
		...(record.notes === null ? {} : { notes: record.notes }),
		sortOrder: record.sortOrder,
	};
}

export function toExerciseListItem(record: ExerciseRecord, locale: LocaleCode): ExerciseListItem {
	const translation = findLocalizedRecord(record.translations, locale, record.slug);
	const muscles = record.muscles.map((muscle) => toExerciseMuscle(muscle, locale));

	return {
		id: record.id,
		slug: record.slug,
		locale,
		name: translation.name,
		aliases: translation.aliases,
		summary: translation.summary,
		difficulty: toContractDifficulty(record.difficulty),
		biomechanics: {
			mechanics: toContractMechanics(record.mechanics),
			movementPattern: toContractMovementPattern(record.movementPattern),
			laterality: toContractLaterality(record.laterality),
			kineticChain: toContractKineticChain(record.kineticChain),
			resistanceCurve: toContractResistanceCurve(record.resistanceCurve),
		},
		demandProfile: {
			technical: toContractDemandLevel(record.technicalDemand),
			mobility: toContractDemandLevel(record.mobilityDemand),
			stability: toContractDemandLevel(record.stabilityDemand),
			axialLoad: toContractDemandLevel(record.axialLoad),
			lumbar: toContractDemandLevel(record.lumbarDemand),
			shoulder: toContractDemandLevel(record.shoulderDemand),
			knee: toContractDemandLevel(record.kneeDemand),
			setupComplexity: toContractDemandLevel(record.setupComplexity),
			spaceRequirement: toContractDemandLevel(record.spaceRequirement),
		},
		context: {
			requiresSpotter: record.requiresSpotter,
			gymRequired: record.gymRequired,
			homeFriendly: record.homeFriendly,
		},
		primaryMuscles: muscles.filter((muscle) => muscle.role === 'primary'),
		equipment: record.equipment.map((equipment) => toExerciseEquipment(equipment, locale)),
	};
}

export function toExercise(record: ExerciseRecord, locale: LocaleCode): Exercise {
	const translation = findLocalizedRecord(record.translations, locale, record.slug);

	return {
		...toExerciseListItem(record, locale),
		...(translation.description === null ? {} : { description: translation.description }),
		muscles: record.muscles.map((muscle) => toExerciseMuscle(muscle, locale)),
		tips: record.tips.map((tip) => {
			const tipTranslation = findLocalizedRecord(tip.translations, locale, tip.id);

			return {
				id: tip.id,
				type: toContractTipType(tip.type),
				text: tipTranslation.text,
				sortOrder: tip.sortOrder,
			};
		}),
		media: record.media.map((media) => {
			const mediaTranslation = findLocalizedRecord(media.translations, locale, media.id);

			return {
				id: media.id,
				kind: toContractMediaKind(media.kind),
				...(media.url === null ? {} : { url: media.url }),
				...(mediaTranslation.altText === null ? {} : { altText: mediaTranslation.altText }),
				sortOrder: media.sortOrder,
			};
		}),
		references: record.references.map(toExerciseReference),
		createdAt: record.createdAt.toISOString(),
		updatedAt: record.updatedAt.toISOString(),
	};
}
