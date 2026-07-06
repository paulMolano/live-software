# Feature Flags Strategy

## Fase inicial

Feature flags locales tipados.

Ejemplo:

```ts
type FeatureFlagKey =
  | 'training.media'
  | 'dashboard.drag'
  | 'finance.enabled'
  | 'pwa.enabled'
  | 'analytics.enabled';
```

## Fase posterior

Evaluar herramientas gratuitas:

- PostHog;
- GrowthBook;
- Flagsmith;
- Flipt.

## Reglas

Cada flag debe tener:

- owner;
- motivo;
- fecha de revisión;
- plan de limpieza;
- tests de variantes críticas.

No mezclar permisos con feature flags.
