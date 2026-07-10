import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = 8102;
const NAME = 'finance_mfe';

const shared = {
	react: { singleton: true },
	'react-dom': { singleton: true },
	'@tanstack/react-query': { singleton: true },
	zustand: { singleton: true },
	'@live-software/contracts': { singleton: true },
};

export default defineConfig((_env, argv) => {
	const isDev = argv.mode !== 'production';
	return {
		context: __dirname,
		entry: { main: './src/index.ts' },
		output: {
			path: path.resolve(__dirname, 'dist'),
			publicPath: `http://localhost:${PORT}/`,
			uniqueName: NAME,
			clean: true,
		},
		devServer: {
			port: PORT,
			historyApiFallback: true,
			hot: true,
			headers: { 'Access-Control-Allow-Origin': '*' },
		},
		resolve: {
			extensions: ['...', '.ts', '.tsx', '.jsx'],
			extensionAlias: {
				'.js': ['.ts', '.js'],
				'.jsx': ['.tsx', '.jsx'],
			},
		},
		experiments: {
			css: true,
		},
		module: {
			rules: [
				{
					test: /\.module\.css$/i,
					type: 'css/module',
				},
				{
					test: /\.css$/i,
					exclude: /\.module\.css$/i,
					type: 'css',
				},
				{
					test: /\.(j|t)sx?$/,
					exclude: [/node_modules/],
					use: {
						loader: 'builtin:swc-loader',
						options: {
							jsc: {
								parser: { syntax: 'typescript', tsx: true },
								transform: {
									react: { runtime: 'automatic', development: isDev },
								},
							},
							env: {
								targets:
									'Chrome >= 87, Firefox >= 78, Edge >= 88, Safari >= 14',
							},
						},
					},
				},
			],
		},
		plugins: [
			new rspack.HtmlRspackPlugin({
				template: './index.html',
				excludeChunks: [NAME],
			}),
			new ModuleFederationPlugin({
				name: NAME,
				filename: 'remoteEntry.js',
				dts: false,
				exposes: {
					'./App': './src/App.tsx',
					'./RemoteEntry': './src/remote-entry.tsx',
					'./FinanceApp': './src/routes/FinanceApp.tsx',
					'./FinanceDashboardWidget':
						'./src/widgets/FinanceDashboardWidget.tsx',
				},
				shared,
			}),
		],
	};
});
