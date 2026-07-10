import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import type {
	CreateExerciseInput,
	DeleteExerciseResponse,
	GetExerciseByIdResponse,
	GetExercisesQuery,
	GetExercisesResponse,
	UpdateExerciseInput,
} from '@live-software/contracts';

import type { Prisma } from '../../generated/prisma/client.js';
import {
	BodyRegion,
	DemandLevel,
	EquipmentRequirement,
	ExerciseDifficulty,
	ExerciseLaterality,
	ExerciseMechanics,
	ExerciseTipType,
	KineticChain,
	MovementPattern,
	MuscleRole,
	ResistanceCurve,
	StimulusLevel,
	SupportedLocale,
	EvidenceSourceType,
} from '../../generated/prisma/enums.js';

import { DatabaseService } from '../../shared/database/database.service.js';
import { seedTrainingExercisesIfEmpty } from './seed/training-seed.service.js';
import { trainingExerciseInclude } from './training-exercise-record.js';
import { toExercise, toExerciseListItem } from './training-exercises.mapper.js';
import { normalizeTrainingLocale } from './training-locale.js';

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const defaultCreateValues = {
	difficulty: ExerciseDifficulty.BEGINNER,
	mechanics: ExerciseMechanics.COMPOUND,
	movementPattern: MovementPattern.OTHER,
	laterality: ExerciseLaterality.BILATERAL,
	kineticChain: KineticChain.MIXED,
	resistanceCurve: ResistanceCurve.UNKNOWN,
	technicalDemand: DemandLevel.LOW,
	mobilityDemand: DemandLevel.LOW,
	stabilityDemand: DemandLevel.LOW,
	axialLoad: DemandLevel.LOW,
	lumbarDemand: DemandLevel.LOW,
	shoulderDemand: DemandLevel.LOW,
	kneeDemand: DemandLevel.LOW,
	setupComplexity: DemandLevel.LOW,
	spaceRequirement: DemandLevel.LOW,
	requiresSpotter: false,
	gymRequired: false,
	homeFriendly: true,
} as const;

function toPrismaEnumValue<TEnum extends Record<string, string>>(
	enumObject: TEnum,
	value: string,
	fieldName: string,
): TEnum[keyof TEnum] {
	const enumKey = value.toUpperCase().replaceAll('-', '_');
	const mappedValue = Object.entries(enumObject).find(
		([key]) => key === enumKey,
	)?.[1];

	if (mappedValue === undefined) {
		throw new BadRequestException(`Invalid value for ${fieldName}: ${value}`);
	}

	return mappedValue;
}

@Injectable()
export class TrainingExercisesService {
	private seedPromise: Promise<void> | null = null;

	public constructor(private readonly database: DatabaseService) { }

	public async findAll(query: GetExercisesQuery): Promise<GetExercisesResponse> {
		await this.ensureSeedData();
		const locale = normalizeTrainingLocale(query.locale);
		const where = this.buildFindAllWhere(query);

		const exercises = await this.database.exercise.findMany({
			where,
			include: trainingExerciseInclude,
			orderBy: {
				slug: 'asc',
			},
		});

		return {
			data: exercises.map((exercise) => toExerciseListItem(exercise, locale)),
		};
	}

	public async findById(idOrSlug: string, localeQuery?: string): Promise<GetExerciseByIdResponse> {
		await this.ensureSeedData();
		const locale = normalizeTrainingLocale(localeQuery);
		const where = uuidPattern.test(idOrSlug)
			? { OR: [{ id: idOrSlug }, { slug: idOrSlug }] }
			: { slug: idOrSlug };

		const exercise = await this.database.exercise.findFirst({
			where,
			include: trainingExerciseInclude,
		});

		if (exercise === null) {
			throw new NotFoundException(`Exercise not found: ${idOrSlug}`);
		}

		return {
			data: toExercise(exercise, locale),
		};
	}

	public async create(input: CreateExerciseInput, localeQuery?: string): Promise<GetExerciseByIdResponse> {
		await this.ensureSeedData();

		if (!input.slug || input.slug.trim().length === 0) {
			throw new BadRequestException('slug is required.');
		}

		if (!input.translations || input.translations.length === 0) {
			throw new BadRequestException('At least one translation is required.');
		}

		const locale = normalizeTrainingLocale(localeQuery);
		const createdExercise = await this.database.exercise.create({
			data: this.toCreateData(input),
			include: trainingExerciseInclude,
		});

		return {
			data: toExercise(createdExercise, locale),
		};
	}

	public async update(
		idOrSlug: string,
		input: UpdateExerciseInput,
		localeQuery?: string,
	): Promise<GetExerciseByIdResponse> {
		await this.ensureSeedData();
		const locale = normalizeTrainingLocale(localeQuery);
		const exerciseId = await this.resolveExerciseId(idOrSlug);
		const updateData = this.toUpdateData(input);

		if (Object.keys(updateData).length === 0) {
			throw new BadRequestException('No fields provided to update.');
		}

		const updatedExercise = await this.database.exercise.update({
			where: { id: exerciseId },
			data: updateData,
			include: trainingExerciseInclude,
		});

		return {
			data: toExercise(updatedExercise, locale),
		};
	}

	public async remove(idOrSlug: string): Promise<DeleteExerciseResponse> {
		await this.ensureSeedData();
		const exerciseId = await this.resolveExerciseId(idOrSlug);

		await this.database.exercise.delete({
			where: {
				id: exerciseId,
			},
		});

		return {
			data: {
				id: exerciseId,
			},
		};
	}

	private buildFindAllWhere(query: GetExercisesQuery): Prisma.ExerciseWhereInput {
		const filters: Prisma.ExerciseWhereInput[] = [];

		if (query.difficulty !== undefined) {
			filters.push({
				difficulty: toPrismaEnumValue(ExerciseDifficulty, query.difficulty, 'difficulty'),
			});
		}

		if (query.mechanics !== undefined) {
			filters.push({
				mechanics: toPrismaEnumValue(ExerciseMechanics, query.mechanics, 'mechanics'),
			});
		}

		if (query.movementPattern !== undefined) {
			filters.push({
				movementPattern: toPrismaEnumValue(MovementPattern, query.movementPattern, 'movementPattern'),
			});
		}

		if (query.bodyRegion !== undefined) {
			filters.push({
				muscles: {
					some: {
						muscleGroup: {
							region: toPrismaEnumValue(BodyRegion, query.bodyRegion, 'bodyRegion'),
						},
					},
				},
			});
		}

		if (query.muscleSlug !== undefined && query.muscleSlug.trim().length > 0) {
			filters.push({
				muscles: {
					some: {
						muscleGroup: {
							slug: query.muscleSlug.trim(),
						},
					},
				},
			});
		}

		if (query.equipmentSlug !== undefined && query.equipmentSlug.trim().length > 0) {
			filters.push({
				equipment: {
					some: {
						equipment: {
							slug: query.equipmentSlug.trim(),
						},
					},
				},
			});
		}

		if (query.search !== undefined && query.search.trim().length > 0) {
			const search = query.search.trim();

			filters.push({
				translations: {
					some: {
						OR: [
							{ name: { contains: search, mode: 'insensitive' } },
							{ summary: { contains: search, mode: 'insensitive' } },
						],
					},
				},
			});
		}

		if (filters.length === 0) {
			return {};
		}

		return {
			AND: filters,
		};
	}

	private toCreateData(input: CreateExerciseInput): Prisma.ExerciseCreateInput {
		return {
			slug: input.slug.trim(),
			difficulty: input.difficulty === undefined
				? defaultCreateValues.difficulty
				: toPrismaEnumValue(ExerciseDifficulty, input.difficulty, 'difficulty'),
			mechanics: input.mechanics === undefined
				? defaultCreateValues.mechanics
				: toPrismaEnumValue(ExerciseMechanics, input.mechanics, 'mechanics'),
			movementPattern: input.movementPattern === undefined
				? defaultCreateValues.movementPattern
				: toPrismaEnumValue(MovementPattern, input.movementPattern, 'movementPattern'),
			laterality: input.laterality === undefined
				? defaultCreateValues.laterality
				: toPrismaEnumValue(ExerciseLaterality, input.laterality, 'laterality'),
			kineticChain: input.kineticChain === undefined
				? defaultCreateValues.kineticChain
				: toPrismaEnumValue(KineticChain, input.kineticChain, 'kineticChain'),
			resistanceCurve: input.resistanceCurve === undefined
				? defaultCreateValues.resistanceCurve
				: toPrismaEnumValue(ResistanceCurve, input.resistanceCurve, 'resistanceCurve'),
			technicalDemand: input.technicalDemand === undefined
				? defaultCreateValues.technicalDemand
				: toPrismaEnumValue(DemandLevel, input.technicalDemand, 'technicalDemand'),
			mobilityDemand: input.mobilityDemand === undefined
				? defaultCreateValues.mobilityDemand
				: toPrismaEnumValue(DemandLevel, input.mobilityDemand, 'mobilityDemand'),
			stabilityDemand: input.stabilityDemand === undefined
				? defaultCreateValues.stabilityDemand
				: toPrismaEnumValue(DemandLevel, input.stabilityDemand, 'stabilityDemand'),
			axialLoad: input.axialLoad === undefined
				? defaultCreateValues.axialLoad
				: toPrismaEnumValue(DemandLevel, input.axialLoad, 'axialLoad'),
			lumbarDemand: input.lumbarDemand === undefined
				? defaultCreateValues.lumbarDemand
				: toPrismaEnumValue(DemandLevel, input.lumbarDemand, 'lumbarDemand'),
			shoulderDemand: input.shoulderDemand === undefined
				? defaultCreateValues.shoulderDemand
				: toPrismaEnumValue(DemandLevel, input.shoulderDemand, 'shoulderDemand'),
			kneeDemand: input.kneeDemand === undefined
				? defaultCreateValues.kneeDemand
				: toPrismaEnumValue(DemandLevel, input.kneeDemand, 'kneeDemand'),
			setupComplexity: input.setupComplexity === undefined
				? defaultCreateValues.setupComplexity
				: toPrismaEnumValue(DemandLevel, input.setupComplexity, 'setupComplexity'),
			spaceRequirement: input.spaceRequirement === undefined
				? defaultCreateValues.spaceRequirement
				: toPrismaEnumValue(DemandLevel, input.spaceRequirement, 'spaceRequirement'),
			requiresSpotter: input.requiresSpotter ?? defaultCreateValues.requiresSpotter,
			gymRequired: input.gymRequired ?? defaultCreateValues.gymRequired,
			homeFriendly: input.homeFriendly ?? defaultCreateValues.homeFriendly,
			translations: {
				create: input.translations.map((translation) => ({
					locale: toPrismaEnumValue(SupportedLocale, translation.locale, 'translations.locale'),
					name: translation.name,
					aliases: translation.aliases ?? [],
					summary: translation.summary,
					...(translation.description === undefined ? {} : { description: translation.description }),
				})),
			},
			muscles: {
				create: (input.muscles ?? []).map((muscle) => ({
					role: toPrismaEnumValue(MuscleRole, muscle.role, 'muscles.role'),
					stimulusLevel: toPrismaEnumValue(StimulusLevel, muscle.stimulusLevel, 'muscles.stimulusLevel'),
					...(muscle.notes === undefined ? {} : { notes: muscle.notes }),
					muscleGroup: {
						connect: {
							slug: muscle.slug,
						},
					},
				})),
			},
			equipment: {
				create: (input.equipment ?? []).map((equipmentItem) => ({
					requirement: toPrismaEnumValue(EquipmentRequirement, equipmentItem.requirement, 'equipment.requirement'),
					equipment: {
						connect: {
							slug: equipmentItem.slug,
						},
					},
				})),
			},
			tips: {
				create: (input.tips ?? []).map((tip) => ({
					type: toPrismaEnumValue(ExerciseTipType, tip.type, 'tips.type'),
					sortOrder: tip.sortOrder ?? 0,
					translations: {
						create: tip.translations.map((translation) => ({
							locale: toPrismaEnumValue(SupportedLocale, translation.locale, 'tips.translations.locale'),
							text: translation.text,
						})),
					},
				})),
			},
			references: {
				create: (input.references ?? []).map((reference) => ({
					sourceType: toPrismaEnumValue(EvidenceSourceType, reference.sourceType, 'references.sourceType'),
					title: reference.title,
					sortOrder: reference.sortOrder ?? 0,
					...(reference.citation === undefined ? {} : { citation: reference.citation }),
					...(reference.url === undefined ? {} : { url: reference.url }),
					...(reference.notes === undefined ? {} : { notes: reference.notes }),
				})),
			},
		};
	}

	private toUpdateData(input: UpdateExerciseInput): Prisma.ExerciseUpdateInput {
		const data: Prisma.ExerciseUpdateInput = {};

		if (input.slug !== undefined) {
			data.slug = input.slug.trim();
		}

		if (input.difficulty !== undefined) {
			data.difficulty = toPrismaEnumValue(ExerciseDifficulty, input.difficulty, 'difficulty');
		}

		if (input.mechanics !== undefined) {
			data.mechanics = toPrismaEnumValue(ExerciseMechanics, input.mechanics, 'mechanics');
		}

		if (input.movementPattern !== undefined) {
			data.movementPattern = toPrismaEnumValue(MovementPattern, input.movementPattern, 'movementPattern');
		}

		if (input.laterality !== undefined) {
			data.laterality = toPrismaEnumValue(ExerciseLaterality, input.laterality, 'laterality');
		}

		if (input.kineticChain !== undefined) {
			data.kineticChain = toPrismaEnumValue(KineticChain, input.kineticChain, 'kineticChain');
		}

		if (input.resistanceCurve !== undefined) {
			data.resistanceCurve = toPrismaEnumValue(ResistanceCurve, input.resistanceCurve, 'resistanceCurve');
		}

		if (input.technicalDemand !== undefined) {
			data.technicalDemand = toPrismaEnumValue(DemandLevel, input.technicalDemand, 'technicalDemand');
		}

		if (input.mobilityDemand !== undefined) {
			data.mobilityDemand = toPrismaEnumValue(DemandLevel, input.mobilityDemand, 'mobilityDemand');
		}

		if (input.stabilityDemand !== undefined) {
			data.stabilityDemand = toPrismaEnumValue(DemandLevel, input.stabilityDemand, 'stabilityDemand');
		}

		if (input.axialLoad !== undefined) {
			data.axialLoad = toPrismaEnumValue(DemandLevel, input.axialLoad, 'axialLoad');
		}

		if (input.lumbarDemand !== undefined) {
			data.lumbarDemand = toPrismaEnumValue(DemandLevel, input.lumbarDemand, 'lumbarDemand');
		}

		if (input.shoulderDemand !== undefined) {
			data.shoulderDemand = toPrismaEnumValue(DemandLevel, input.shoulderDemand, 'shoulderDemand');
		}

		if (input.kneeDemand !== undefined) {
			data.kneeDemand = toPrismaEnumValue(DemandLevel, input.kneeDemand, 'kneeDemand');
		}

		if (input.setupComplexity !== undefined) {
			data.setupComplexity = toPrismaEnumValue(DemandLevel, input.setupComplexity, 'setupComplexity');
		}

		if (input.spaceRequirement !== undefined) {
			data.spaceRequirement = toPrismaEnumValue(DemandLevel, input.spaceRequirement, 'spaceRequirement');
		}

		if (input.requiresSpotter !== undefined) {
			data.requiresSpotter = input.requiresSpotter;
		}

		if (input.gymRequired !== undefined) {
			data.gymRequired = input.gymRequired;
		}

		if (input.homeFriendly !== undefined) {
			data.homeFriendly = input.homeFriendly;
		}

		if (input.translations !== undefined) {
			data.translations = {
				deleteMany: {},
				create: input.translations.map((translation) => ({
					locale: toPrismaEnumValue(SupportedLocale, translation.locale, 'translations.locale'),
					name: translation.name,
					aliases: translation.aliases ?? [],
					summary: translation.summary,
					...(translation.description === undefined ? {} : { description: translation.description }),
				})),
			};
		}

		if (input.muscles !== undefined) {
			data.muscles = {
				deleteMany: {},
				create: input.muscles.map((muscle) => ({
					role: toPrismaEnumValue(MuscleRole, muscle.role, 'muscles.role'),
					stimulusLevel: toPrismaEnumValue(StimulusLevel, muscle.stimulusLevel, 'muscles.stimulusLevel'),
					...(muscle.notes === undefined ? {} : { notes: muscle.notes }),
					muscleGroup: {
						connect: {
							slug: muscle.slug,
						},
					},
				})),
			};
		}

		if (input.equipment !== undefined) {
			data.equipment = {
				deleteMany: {},
				create: input.equipment.map((equipmentItem) => ({
					requirement: toPrismaEnumValue(EquipmentRequirement, equipmentItem.requirement, 'equipment.requirement'),
					equipment: {
						connect: {
							slug: equipmentItem.slug,
						},
					},
				})),
			};
		}

		if (input.tips !== undefined) {
			data.tips = {
				deleteMany: {},
				create: input.tips.map((tip) => ({
					type: toPrismaEnumValue(ExerciseTipType, tip.type, 'tips.type'),
					sortOrder: tip.sortOrder ?? 0,
					translations: {
						create: tip.translations.map((translation) => ({
							locale: toPrismaEnumValue(SupportedLocale, translation.locale, 'tips.translations.locale'),
							text: translation.text,
						})),
					},
				})),
			};
		}

		if (input.references !== undefined) {
			data.references = {
				deleteMany: {},
				create: input.references.map((reference) => ({
					sourceType: toPrismaEnumValue(EvidenceSourceType, reference.sourceType, 'references.sourceType'),
					title: reference.title,
					sortOrder: reference.sortOrder ?? 0,
					...(reference.citation === undefined ? {} : { citation: reference.citation }),
					...(reference.url === undefined ? {} : { url: reference.url }),
					...(reference.notes === undefined ? {} : { notes: reference.notes }),
				})),
			};
		}

		return data;
	}

	private async resolveExerciseId(idOrSlug: string): Promise<string> {
		const where = uuidPattern.test(idOrSlug)
			? { OR: [{ id: idOrSlug }, { slug: idOrSlug }] }
			: { slug: idOrSlug };

		const exercise = await this.database.exercise.findFirst({
			where,
			select: {
				id: true,
			},
		});

		if (exercise === null) {
			throw new NotFoundException(`Exercise not found: ${idOrSlug}`);
		}

		return exercise.id;
	}

	private async ensureSeedData(): Promise<void> {
		this.seedPromise ??= seedTrainingExercisesIfEmpty(this.database);

		await this.seedPromise;
	}
}
