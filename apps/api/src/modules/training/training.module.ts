import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module.js';

import { TrainingExercisesController } from './training-exercises.controller.js';
import { TrainingExercisesService } from './training-exercises.service.js';

@Module({
	imports: [AuthModule],
	controllers: [TrainingExercisesController],
	providers: [TrainingExercisesService],
})
export class TrainingModule { }
