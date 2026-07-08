import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import appConfig from './config/app.config.js';
import { HealthModule } from './health/health.module.js';
import { TrainingModule } from './modules/training/training.module.js';
import { DatabaseModule } from './shared/database/database.module.js';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			cache: true,
			load: [appConfig],
		}),
		DatabaseModule,
		HealthModule,
		TrainingModule,
	],
})
export class AppModule { }
