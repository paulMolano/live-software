type AppConfig = {
	port: number;
};

type RootConfig = {
	app: AppConfig;
};

export default function appConfig(): RootConfig {
	return {
		app: {
			port: Number(process.env['PORT'] ?? 3000),
		},
	};
}
