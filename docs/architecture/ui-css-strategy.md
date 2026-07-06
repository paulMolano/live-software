# UI and CSS Strategy

## Decisión

Usar Mantine como UI library principal.

No construir un Design System propio desde cero.

## packages/ui-kit

Capa fina sobre Mantine:

- theme;
- providers;
- layout primitives;
- wrappers comunes;
- estados globales;
- reexports controlados si aporta.

## CSS

Usar CSS Modules para estilos propios.

Reglas:

- estilos globales mínimos;
- CSS variables del theme;
- no Tailwind en fase inicial;
- evitar `!important`;
- estilos de dominio dentro del MFE;
- no meter dominio en `ui-kit`.

## Dark mode

Desde el inicio:

- light;
- dark;
- system;
- persistencia local.

## i18n

Desde el inicio:

- react-i18next;
- español inicial;
- inglés futuro;
- namespaces por app/dominio.
