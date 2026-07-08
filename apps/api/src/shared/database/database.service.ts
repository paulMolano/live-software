import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from '../../generated/prisma/client.js';
import type { RootConfig } from '../../config/app.config.js';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
	public constructor(@Inject(ConfigService) configService: ConfigService<RootConfig, true>) {
		const databaseUrl = configService.get<string>('database.url', { infer: true });
		const adapter = new PrismaPg({ connectionString: databaseUrl });

		super({ adapter });
	}

	public async onModuleInit(): Promise<void> {
		await this.$connect();
	}

	public async onModuleDestroy(): Promise<void> {
		await this.$disconnect();
	}
}
