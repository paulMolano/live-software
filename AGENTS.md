# AGENTS.md

## Proyecto

Este repositorio es `live-software`.

Es a la vez:

1. Una webapp personal útil.
2. Un laboratorio serio para aprender arquitectura frontend, backend, microfrontends, React 19, IA aplicada al desarrollo, agentes, Codex, GitHub Projects y automatización.

## Principio central

No solo se busca velocidad. Se busca aprender y construir con criterio.

Cada cambio debe aportar valor de producto o valor de aprendizaje.

## Stack aprobado provisional

Frontend:

- React 19.x estable.
- Nx.
- TypeScript estricto.
- Module Federation para microfrontends.
- Mantine como librería UI.
- CSS Modules para estilos propios.
- Zustand para estado global cliente.
- TanStack Query para server state.
- React Hook Form + Zod para formularios.
- React Grid Layout como primera opción para dashboard draggable/resizable.
- react-i18next para i18n.

Backend:

- NestJS.
- PostgreSQL.
- Prisma.
- OpenAPI/Swagger.
- Keycloak para autenticación.
- CacheModule inicialmente.
- Redis en fase posterior.

Infra:

- pnpm.
- Docker Compose.
- GitHub Actions.
- GitHub Pages para frontend estático inicial.
- Backend local primero; deploy backend posterior.

## Arquitectura

Usar un monorepo único.

Apps iniciales:

- `apps/shell`
- `apps/training-mfe`
- `apps/api`

Paquetes iniciales:

- `packages/ui-kit`
- `packages/contracts`
- `packages/config`
- `packages/auth`
- `packages/analytics`
- `packages/feature-flags`
- `packages/testing`
- `packages/shared-utils`

## Microfrontends

Usamos microfrontends por aprendizaje.

Reglas:

- Dividir por dominio, no por componentes sueltos.
- La shell carga remotes y gestiona layout/providers globales.
- Los remotes contienen lógica de dominio.
- Un remote no debe importar código de otro remote.
- Los contratos públicos van en `packages/contracts`.
- Los fallos de remote deben tener fallback.
- Todo remote debe poder construirse y probarse de forma independiente.

Primer remote real:

- `training-mfe`

Futuros remotes documentados:

- `finance-mfe`
- `learning-mfe`
- `habits-mfe`

No crear nuevos remotes sin ADR.

## Backend

El backend es crítico desde el principio.

Usar backend modular monolítico, no microservicios.

Módulos iniciales:

- `dashboard`
- `training`
- `users`
- `auth`

Módulos futuros documentados:

- `finance`
- `learning`
- `habits`
- `family`

Cada módulo debe tener boundaries claros.

## HTML semántico y accesibilidad

Obligatorio:

- Usar `main`, `section`, `header`, `nav`, `footer` cuando corresponda.
- Usar `button` para acciones.
- Usar `a` o navegación de router para navegación.
- Formularios con `label`.
- Errores asociados a campos.
- Focus visible.
- Navegación por teclado.
- No depender solo del color.
- Cubrir loading, error, empty, forbidden y success cuando aplique.

ARIA solo cuando HTML semántico no sea suficiente.

## CSS

Usar:

- Mantine para componentes base y theming.
- CSS Modules para estilos propios.
- CSS variables/tokens del tema.
- Estilos globales mínimos.

No usar:

- `!important` salvo justificación.
- Tailwind en fase inicial.
- estilos de dominio dentro de `ui-kit`.

## TypeScript

TypeScript es uno de los objetivos principales de aprendizaje.

Reglas:

- `strict: true`.
- Evitar `any`.
- Usar `unknown` + narrowing cuando no se conoce el tipo.
- Modelar contratos con tipos explícitos.
- Usar discriminated unions para estados.
- DTOs y payloads tipados.
- Props públicas bien diseñadas.

## React 19

Explorar React 19 con criterio.

Usar cuando tenga sentido:

- `Suspense`
- `useTransition`
- `startTransition`
- `useOptimistic`
- `useActionState`
- `useDeferredValue`
- `useEffectEvent` si está disponible en la versión instalada

No usar React Server Components en fase inicial.

## Estado

Clasificar siempre antes de elegir herramienta:

- local state: React
- UI global state: Zustand
- server state: TanStack Query
- persisted preferences: Zustand persist/localStorage
- domain state del servidor: backend + TanStack Query

No usar Redux en fase inicial.

## Testing

Testing por riesgo.

Mínimo:

- Vitest para lógica.
- Testing Library para componentes.
- Playwright para smoke/e2e.
- axe para accesibilidad.
- Supertest/Nest testing para API.
- MSW para mocks de API si aporta.

## Performance

Performance como quality gate:

- Lighthouse CI.
- Bundle budgets.
- Web Vitals.
- React Profiler en exploraciones.
- Medición de tiempo de carga de remotes.
- Medición de latencia API y cache hit/miss en backend cuando aplique.

## Analytics, flags y observabilidad

Todo debe ir detrás de contratos internos:

- `packages/analytics`
- `packages/feature-flags`

No llamar directamente a un vendor desde componentes.

Herramienta gratuita preferida para explorar:

- PostHog cloud free tier o self-host si interesa.

## IA y agentes

Codex debe trabajar con issues pequeñas, planes y PRs revisables.

### Documentation trail

Cada PR significativo debe considerar si debe actualizar la traza de
documentacion.

Si el PR introduce una decision arquitectonica relevante, un flujo de trabajo,
un setup tecnologico o un hito de aprendizaje, el PR debe hacer una de estas
cosas:

1. actualizar docs internos bajo `docs/`;
2. actualizar `apps/guide`;
3. anadir una nota a un backlog futuro de la guia;
4. declarar explicitamente `No guide update needed` en la descripcion del PR.

No actualizar `apps/guide` en PRs de implementacion no relacionados salvo que
la issue lo pida explicitamente.

Flujo obligatorio para tareas no triviales:

1. Leer documentación relevante.
2. Explorar repo.
3. Proponer plan.
4. Listar archivos a tocar.
5. Implementar diff pequeño.
6. Ejecutar validaciones.
7. Resumir cambios.
8. Declarar riesgos.
9. Proponer siguiente tarea.

No producir cambios enormes.

## Done means

Una tarea está terminada cuando:

- respeta el scope;
- pasan lint/typecheck/tests/build si existen;
- los estados no felices están contemplados;
- se respetan boundaries;
- se actualizan docs/ADRs si la decisión cambia;
- el resultado es revisable.

Respuesta final obligatoria:

- qué cambió;
- archivos modificados;
- comandos ejecutados;
- validación;
- riesgos;
- siguiente paso recomendado.
