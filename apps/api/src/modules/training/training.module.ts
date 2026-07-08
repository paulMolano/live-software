import { Module } from '@nestjs/common';

import { TrainingExercisesController } from './training-exercises.controller.js';
import { TrainingExercisesService } from './training-exercises.service.js';

@Module({
	controllers: [TrainingExercisesController],
	providers: [TrainingExercisesService],
})
export class TrainingModule { }
