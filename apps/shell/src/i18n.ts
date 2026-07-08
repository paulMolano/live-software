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
				'La shell sigue disponible. Verifica que el remote este levantado y vuelve a intentar.',
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
			languageEs: 'Espanol',
			languageEn: 'Ingles',
			skipToMain: 'Saltar al contenido principal',
			authLabel: 'Autenticacion',
			authStatus: 'Sesion',
			authLoading: 'Comprobando sesion',
			authAuthenticating: 'Autenticando',
			authUnauthenticated: 'Sin sesion',
			authAuthenticated: 'Sesion iniciada',
			authError: 'Error de autenticacion',
			authLogin: 'Entrar',
			authLogout: 'Salir',
			authUserLabel: 'Usuario',
			authProtectedCheck: 'Probar API protegida',
			authProtectedIdle: 'API protegida pendiente',
			authProtectedLoading: 'Consultando API protegida',
			authProtectedSuccess: 'API protegida respondio correctamente',
			authProtectedUnauthorized:
				'API protegida rechazo la peticion sin sesion',
			authProtectedForbidden: 'API protegida devolvio forbidden',
			authProtectedError: 'No se pudo comprobar la API protegida',
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
			authLabel: 'Authentication',
			authStatus: 'Session',
			authLoading: 'Checking session',
			authAuthenticating: 'Authenticating',
			authUnauthenticated: 'Signed out',
			authAuthenticated: 'Signed in',
			authError: 'Authentication error',
			authLogin: 'Sign in',
			authLogout: 'Sign out',
			authUserLabel: 'User',
			authProtectedCheck: 'Check protected API',
			authProtectedIdle: 'Protected API pending',
			authProtectedLoading: 'Checking protected API',
			authProtectedSuccess: 'Protected API responded correctly',
			authProtectedUnauthorized:
				'Protected API rejected the request without a session',
			authProtectedForbidden: 'Protected API returned forbidden',
			authProtectedError: 'Could not check protected API',
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
