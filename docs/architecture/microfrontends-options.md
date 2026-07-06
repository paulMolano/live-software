# Microfrontends: opciones consideradas

## 1. Monolito modular frontend

Bueno para velocidad y simplicidad.

Desventaja: no permite aprender runtime composition real.

## 2. Packages compartidos build-time

Apps comparten paquetes en build.

Bueno para librerías internas.

Desventaja: no simula carga runtime de remotes ni fallos de remote.

## 3. Module Federation

Host consume remotes en runtime.

Ventajas:

- aprendizaje real de host/remotes;
- shared dependencies;
- carga runtime;
- fallback de remotes;
- posibilidad futura de deploy independiente;
- encaja con Nx.

Riesgos:

- versionado;
- shared dependencies;
- runtime failures;
- tooling más complejo.

Decisión: primera opción para aprender microfrontends.

## 4. single-spa + import maps

Muy buena opción para orquestar múltiples aplicaciones y frameworks.

Ventajas:

- potente para ecosistemas heterogéneos;
- import maps como mecanismo explícito.

Riesgos:

- añade otra capa mental;
- más setup;
- puede ser demasiado para el primer milestone.

Decisión: documentado como alternativa futura.

## 5. Next.js Multi-Zones

Microfrontends por rutas usando varias apps Next.

Ventajas:

- muy buena opción para SEO/rendering;
- encaja con partes públicas.

Riesgos:

- menos útil para aprender federation runtime en React SPA;
- puede complicar shell/remotes iniciales.

Decisión: fase futura en `apps/web-next` o experimento aparte.

## 6. Web Components

Útil para interoperabilidad entre frameworks.

Riesgos:

- DX distinta;
- styling/events más complejos;
- no es prioritario.

## 7. Iframes

Aislamiento fuerte.

Riesgos:

- UX, routing, auth y comunicación más torpes.

Decisión: descartado salvo experimento.
