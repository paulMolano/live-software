# SEO, Rendering and Next.js Strategy

## Motivo

SEO no es crítico para una app privada, pero sí se quiere aprender.

## Decisión

No usar Next.js para la shell inicial.

## Por qué

La primera fase quiere aprender Module Federation, shell/remotes, React 19, backend, auth y dashboard. Meter Next desde el inicio añade SSR/RSC/routing/server boundaries.

## Cómo meter Next después sin romperlo todo

Crear una app separada:

```txt
apps/web-next
```

Uso:

- landing;
- documentación pública;
- knowledge base;
- SEO;
- metadata;
- rendering strategies;
- SSG/SSR/ISR;
- Open Graph;
- sitemap;
- robots.

## Alternativa futura

Next Multi-Zones para estudiar microfrontends por rutas.

## No decisión

No migrar shell a Next hasta tener una razón clara y ADR.
