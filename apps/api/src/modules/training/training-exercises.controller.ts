import { Controller, Get, Param, Query } from '@nestjs/common';
import type { GetExerciseByIdResponse, GetExercisesResponse } from '@live-software/contracts';

import { TrainingExercisesService } from './training-exercises.service.js';

@Controller('api/training/exercises')
export class TrainingExercisesController {
	public constructor(private readonly trainingExercisesService: TrainingExercisesService) { }

	@Get()
	public async getExercises(@Query('locale') locale?: string): Promise<GetExercisesResponse> {
		return this.trainingExercisesService.findAll(locale);
	}

	@Get(':id')
	public async getExerciseById(
		@Param('id') id: string,
		@Query('locale') locale?: string,
	): Promise<GetExerciseByIdResponse> {
		return this.trainingExercisesService.findById(id, locale);
	}
}
