import { Injectable, NotFoundException } from '@nestjs/common';
import type { GetExerciseByIdResponse, GetExercisesResponse } from '@live-software/contracts';

import { DatabaseService } from '../../shared/database/database.service.js';
import { seedTrainingExercisesIfEmpty } from './seed/training-seed.service.js';
import { trainingExerciseInclude } from './training-exercise-record.js';
import { toExercise, toExerciseListItem } from './training-exercises.mapper.js';
import { normalizeTrainingLocale } from './training-locale.js';

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

@Injectable()
export class TrainingExercisesService {
	private seedPromise: Promise<void> | null = null;

	public constructor(private readonly database: DatabaseService) { }

	public async findAll(localeQuery?: string): Promise<GetExercisesResponse> {
		await this.ensureSeedData();
		const locale = normalizeTrainingLocale(localeQuery);

		const exercises = await this.database.exercise.findMany({
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

	private async ensureSeedData(): Promise<void> {
		this.seedPromise ??= seedTrainingExercisesIfEmpty(this.database);

		await this.seedPromise;
	}
}
