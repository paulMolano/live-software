import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { adminRole } from '@live-software/contracts';
import type {
	CreateExerciseInput,
	DeleteExerciseResponse,
	GetExerciseByIdResponse,
	GetExercisesQuery,
	GetExercisesResponse,
	UpdateExerciseInput,
} from '@live-software/contracts';

import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { Roles } from '../auth/roles.decorator.js';
import { RolesGuard } from '../auth/roles.guard.js';

import { TrainingExercisesService } from './training-exercises.service.js';

@Controller('api/training/exercises')
export class TrainingExercisesController {
	public constructor(private readonly trainingExercisesService: TrainingExercisesService) { }

	@Get()
	public async getExercises(@Query() query: GetExercisesQuery): Promise<GetExercisesResponse> {
		return this.trainingExercisesService.findAll(query);
	}

	@Get(':id')
	public async getExerciseById(
		@Param('id') id: string,
		@Query('locale') locale?: string,
	): Promise<GetExerciseByIdResponse> {
		return this.trainingExercisesService.findById(id, locale);
	}

	@Post()
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(adminRole)
	public async createExercise(
		@Body() input: CreateExerciseInput,
		@Query('locale') locale?: string,
	): Promise<GetExerciseByIdResponse> {
		return this.trainingExercisesService.create(input, locale);
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(adminRole)
	public async updateExercise(
		@Param('id') id: string,
		@Body() input: UpdateExerciseInput,
		@Query('locale') locale?: string,
	): Promise<GetExerciseByIdResponse> {
		return this.trainingExercisesService.update(id, input, locale);
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(adminRole)
	public async deleteExercise(@Param('id') id: string): Promise<DeleteExerciseResponse> {
		return this.trainingExercisesService.remove(id);
	}
}
