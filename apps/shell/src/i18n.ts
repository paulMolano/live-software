import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
	es: {
		translation: {
			appName: 'Shell de Software Vida',
			navHome: 'Inicio',
			navTraining: 'Entrenamiento',
			homeTitle: 'Base de plataforma lista',
			homeBody:
				'Esta shell centraliza proveedores globales y carga remotes en runtime.',
			trainingTitle: 'Ruta de entrenamiento',
			trainingBody:
				'Este espacio carga el training-mfe como remote por Module Federation.',
			loadingRemote: 'Cargando remote {{name}}...',
			remoteErrorTitle: 'No se pudo cargar el remote {{name}}',
			remoteErrorDescription:
				'La shell sigue disponible. Verifica que el remote esté levantado y vuelve a intentar.',
			retry: 'Reintentar',
			uiStateLabel: 'Estado UI',
			sidebarOpen: 'Sidebar abierta',
			sidebarClosed: 'Sidebar cerrada',
			dashboardLayoutLabel: 'Layout',
			layoutStacked: 'Apilado',
			layoutSplit: 'Dividido',
			stateBoundaryNote:
				'Zustand guarda preferencias de interfaz; TanStack Query se reserva para estado de servidor.',
			themeLabel: 'Tema',
			themeLight: 'Claro',
			themeDark: 'Oscuro',
			themeAuto: 'Sistema',
			languageLabel: 'Idioma',
			languageEs: 'Español',
			languageEn: 'Inglés',
			skipToMain: 'Saltar al contenido principal',
		},
	},
	en: {
		translation: {
			appName: 'Software Vida Shell',
			navHome: 'Home',
			navTraining: 'Training',
			homeTitle: 'Platform foundation ready',
			homeBody:
				'This shell centralizes global providers and loads remotes at runtime.',
			trainingTitle: 'Training route',
			trainingBody:
				'This area loads training-mfe as a Module Federation remote.',
			loadingRemote: 'Loading remote {{name}}...',
			remoteErrorTitle: 'Failed to load remote {{name}}',
			remoteErrorDescription:
				'The shell is still available. Ensure the remote is running and try again.',
			retry: 'Retry',
			uiStateLabel: 'UI state',
			sidebarOpen: 'Sidebar open',
			sidebarClosed: 'Sidebar closed',
			dashboardLayoutLabel: 'Layout',
			layoutStacked: 'Stacked',
			layoutSplit: 'Split',
			stateBoundaryNote:
				'Zustand keeps interface preferences; TanStack Query is reserved for server state.',
			themeLabel: 'Theme',
			themeLight: 'Light',
			themeDark: 'Dark',
			themeAuto: 'System',
			languageLabel: 'Language',
			languageEs: 'Spanish',
			languageEn: 'English',
			skipToMain: 'Skip to main content',
		},
	},
} as const;

void i18n.use(initReactI18next).init({
	resources,
	lng: 'es',
	fallbackLng: 'es',
	interpolation: {
		escapeValue: false,
	},
});

export { i18n };
