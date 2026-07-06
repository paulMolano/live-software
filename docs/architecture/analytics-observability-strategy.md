# Analytics and Observability Strategy

## Restricción

Usar opciones gratuitas o self-host.

## Decisión inicial

No acoplar componentes a vendor.

Crear contratos internos:

- `packages/analytics`
- `packages/feature-flags`

## Opción principal futura

PostHog porque cubre en una sola plataforma:

- product analytics;
- web analytics;
- session replay;
- feature flags;
- experiments;
- surveys;
- error tracking básico;
- free tier generoso.

## Alternativas gratuitas/futuras

- GrowthBook para experimentación/flags.
- OpenReplay para session replay self-host.
- Sentry free tier para errores/performance.
- Plausible/Umami self-host para analytics simple.

## Eventos iniciales

- `app.loaded`
- `remote.loaded`
- `remote.failed`
- `dashboard.widget_moved`
- `dashboard.widget_resized`
- `training.exercise_created`
- `training.exercise_updated`

## Privacidad

- No enviar PII innecesaria.
- Masking en session replay.
- Consentimiento si se expone públicamente.
- No trackear datos sensibles de salud/finanzas sin decisión explícita.
