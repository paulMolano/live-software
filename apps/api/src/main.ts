import 'reflect-metadata';

import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module.js';

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);
	const port = configService.get<number>('app.port') ?? 3000;

	await app.listen(port);

	const logger = new Logger('Bootstrap');
	logger.log(`API listening on http://localhost:${port}`);
}

void bootstrap();
