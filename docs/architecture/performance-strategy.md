# Performance Strategy

## Objetivo

Tener performance siempre visible.

## Herramientas

- Lighthouse CI.
- bundle budgets.
- web-vitals.
- React Profiler manual.
- remote load timing.
- API latency logging.

## Métricas iniciales

- Lighthouse Performance >= 85.
- Accessibility >= 95.
- Best Practices >= 90.
- SEO >= 80 en páginas públicas/de aprendizaje.
- Remote load timing registrado.
- Bundle size revisado.

## En microfrontends

Medir:

- shell initial bundle;
- training remote bundle;
- remoteEntry load time;
- shared dependency duplication;
- route transition time.
