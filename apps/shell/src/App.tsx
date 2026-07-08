import {
  Component,
  Suspense,
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useMantineColorScheme } from '@mantine/core';
import { useAuth, type AuthStatus } from '@live-software/auth';
import { getShellApiBaseUrl } from './auth-runtime-config';
import { lazyProvider } from './mf';
import { useUiStore } from './state/ui-store';
import * as styles from './App.module.css';

class ProviderBoundary extends Component<
  {
    children: ReactNode;
    name: string;
    title: string;
    description: string;
    retryLabel: string;
  },
  { error: Error | null }
> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className={styles.alert} role="alert">
          <p>
            {this.props.title}: {this.state.error.message}
          </p>
          <p>{this.props.description}</p>
          <button
            type="button"
            className={styles.controlButton}
            onClick={() => this.setState({ error: null })}
          >
            {this.props.retryLabel}
          </button>
        </div>
      );
    }

    return (
      <Suspense fallback={<p>{this.props.name}</p>}>
        {this.props.children}
      </Suspense>
    );
  }
}

const ProviderTrainingMfe = lazyProvider('training-mfe', 'RemoteEntry');

function getRouteFromHash(hash: string): 'home' | 'training' {
  return hash === '#/training' ? 'training' : 'home';
}

function ThemeControls() {
  const { t } = useTranslation();
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const options = useMemo(
    () => [
      { value: 'light', label: t('themeLight') },
      { value: 'dark', label: t('themeDark') },
      { value: 'auto', label: t('themeAuto') },
    ],
    [t]
  );

  return (
    <section className={styles.controlGroup} aria-label={t('themeLabel')}>
      <span className={styles.controlLabel}>{t('themeLabel')}:</span>
      {options.map((option) => {
        const isActive = colorScheme === option.value;
        return (
          <button
            key={option.value}
            type="button"
            className={`${styles.controlButton} ${isActive ? styles.controlButtonActive : ''}`}
            onClick={() => setColorScheme(option.value as 'light' | 'dark' | 'auto')}
            aria-pressed={isActive}
          >
            {option.label}
          </button>
        );
      })}
    </section>
  );
}

function LanguageControls() {
  const { t, i18n } = useTranslation();

  return (
    <section className={styles.controlGroup} aria-label={t('languageLabel')}>
      <label className={styles.controlLabel} htmlFor="language-select">
        {t('languageLabel')}:
      </label>
      <select
        id="language-select"
        className={styles.controlSelect}
        value={i18n.language}
        onChange={(event) => {
          void i18n.changeLanguage(event.currentTarget.value);
        }}
      >
        <option value="es">{t('languageEs')}</option>
        <option value="en">{t('languageEn')}</option>
      </select>
    </section>
  );
}

function UiPreferencesControls() {
  const { t } = useTranslation();
  const sidebarOpen = useUiStore((state) => state.sidebarOpen);
  const dashboardLayoutMode = useUiStore((state) => state.dashboardLayoutMode);
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);
  const setDashboardLayoutMode = useUiStore(
    (state) => state.setDashboardLayoutMode
  );

  return (
    <section className={styles.controlGroup} aria-label={t('uiStateLabel')}>
      <span className={styles.controlLabel}>{t('uiStateLabel')}:</span>
      <button
        type="button"
        className={styles.controlButton}
        aria-pressed={sidebarOpen}
        onClick={toggleSidebar}
      >
        {sidebarOpen ? t('sidebarOpen') : t('sidebarClosed')}
      </button>
      <label className={styles.controlLabel} htmlFor="dashboard-layout-mode">
        {t('dashboardLayoutLabel')}:
      </label>
      <select
        id="dashboard-layout-mode"
        className={styles.controlSelect}
        value={dashboardLayoutMode}
        onChange={(event) => {
          setDashboardLayoutMode(event.currentTarget.value as 'stacked' | 'split');
        }}
      >
        <option value="stacked">{t('layoutStacked')}</option>
        <option value="split">{t('layoutSplit')}</option>
      </select>
    </section>
  );
}

type ProtectedApiState =
  | 'idle'
  | 'loading'
  | 'success'
  | 'unauthorized'
  | 'forbidden'
  | 'error';

function authStatusLabel(status: AuthStatus, t: (key: string) => string): string {
  switch (status) {
    case 'loading':
      return t('authLoading');
    case 'authenticating':
      return t('authAuthenticating');
    case 'authenticated':
      return t('authAuthenticated');
    case 'error':
      return t('authError');
    case 'unauthenticated':
      return t('authUnauthenticated');
  }

  return t('authUnauthenticated');
}

function protectedApiStatusLabel(
  status: ProtectedApiState,
  t: (key: string) => string
): string {
  switch (status) {
    case 'idle':
      return t('authProtectedIdle');
    case 'loading':
      return t('authProtectedLoading');
    case 'success':
      return t('authProtectedSuccess');
    case 'unauthorized':
      return t('authProtectedUnauthorized');
    case 'forbidden':
      return t('authProtectedForbidden');
    case 'error':
      return t('authProtectedError');
  }

  return t('authProtectedError');
}

function AuthControls() {
  const { t } = useTranslation();
  const auth = useAuth();
  const [protectedApiState, setProtectedApiState] =
    useState<ProtectedApiState>('idle');

  const checkProtectedApi = async () => {
    setProtectedApiState('loading');

    try {
      const accessToken = auth.getAccessToken();
      const response = await fetch(`${getShellApiBaseUrl()}/api/auth/session`, {
        headers: accessToken
          ? {
              Authorization: `Bearer ${accessToken}`,
            }
          : {},
      });

      if (response.ok) {
        setProtectedApiState('success');
        return;
      }

      if (response.status === 401) {
        setProtectedApiState('unauthorized');
        return;
      }

      if (response.status === 403) {
        setProtectedApiState('forbidden');
        return;
      }

      setProtectedApiState('error');
    } catch {
      setProtectedApiState('error');
    }
  };

  const busy = auth.status === 'loading' || auth.status === 'authenticating';
  const statusText = authStatusLabel(auth.status, t);
  const protectedApiText = protectedApiStatusLabel(protectedApiState, t);
  const statusClassName =
    auth.status === 'error' || protectedApiState === 'error'
      ? styles.dangerText
      : auth.isAuthenticated || protectedApiState === 'success'
        ? styles.successText
        : undefined;

  return (
    <section className={styles.controlGroup} aria-label={t('authLabel')}>
      <span className={styles.controlLabel}>{t('authStatus')}:</span>
      <span className={statusClassName}>{statusText}</span>
      {auth.user ? (
        <span>
          {t('authUserLabel')}: {auth.user.name ?? auth.user.username ?? auth.user.id}
        </span>
      ) : null}
      <button
        type="button"
        className={styles.controlButton}
        onClick={() => void auth.login()}
        disabled={busy || auth.isAuthenticated}
      >
        {t('authLogin')}
      </button>
      <button
        type="button"
        className={styles.controlButton}
        onClick={auth.logout}
        disabled={busy || !auth.isAuthenticated}
      >
        {t('authLogout')}
      </button>
      <button
        type="button"
        className={styles.controlButton}
        onClick={() => void checkProtectedApi()}
        disabled={protectedApiState === 'loading'}
      >
        {t('authProtectedCheck')}
      </button>
      <span className={statusClassName}>{protectedApiText}</span>
      {auth.errorMessage ? (
        <span className={styles.dangerText}>{auth.errorMessage}</span>
      ) : null}
    </section>
  );
}

export function App() {
  const { t } = useTranslation();
  const [route, setRoute] = useState<'home' | 'training'>(() =>
    getRouteFromHash(window.location.hash)
  );

  useEffect(() => {
    const onHashChange = () => {
      setRoute(getRouteFromHash(window.location.hash));
    };

    window.addEventListener('hashchange', onHashChange);
    return () => {
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

  const homeActive = route === 'home';
  const trainingActive = route === 'training';

  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#main-content">
        {t('skipToMain')}
      </a>

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <h1>{t('appName')}</h1>
          <nav className={styles.nav} aria-label="Global">
            <a
              className={`${styles.navLink} ${homeActive ? styles.navLinkActive : ''}`}
              href="#/"
              aria-current={homeActive ? 'page' : undefined}
            >
              {t('navHome')}
            </a>
            <a
              className={`${styles.navLink} ${trainingActive ? styles.navLinkActive : ''}`}
              href="#/training"
              aria-current={trainingActive ? 'page' : undefined}
            >
              {t('navTraining')}
            </a>
          </nav>

          <div className={styles.controls}>
            <UiPreferencesControls />
            <ThemeControls />
            <LanguageControls />
            <AuthControls />
          </div>
        </div>
      </header>

      <main id="main-content" className={styles.main}>
        {homeActive ? (
          <section className={styles.card}>
            <h2 className={styles.sectionTitle}>{t('homeTitle')}</h2>
            <p>{t('homeBody')}</p>
            <p>{t('stateBoundaryNote')}</p>
            <div className={styles.authPanel}>
              <p className={styles.statusLine}>{t('authProtectedIdle')}</p>
            </div>
          </section>
        ) : (
          <section className={styles.card}>
            <h2 className={styles.sectionTitle}>{t('trainingTitle')}</h2>
            <p>{t('trainingBody')}</p>

            <ProviderBoundary
              name={t('loadingRemote', { name: 'training-mfe' })}
              title={t('remoteErrorTitle', { name: 'training-mfe' })}
              description={t('remoteErrorDescription')}
              retryLabel={t('retry')}
            >
              <ProviderTrainingMfe />
            </ProviderBoundary>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
