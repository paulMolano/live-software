export type AppConfig = {
	port: number;
};

export type DatabaseConfig = {
	url: string;
};

export type RootConfig = {
	app: AppConfig;
	database: DatabaseConfig;
};

const localDatabaseUrl = 'postgresql://live_software:live_software@localhost:5432/live_software?schema=public';

export default function appConfig(): RootConfig {
	return {
		app: {
			port: Number(process.env['PORT'] ?? 3000),
		},
		database: {
			url: process.env['DATABASE_URL'] ?? localDatabaseUrl,
		},
	};
}
