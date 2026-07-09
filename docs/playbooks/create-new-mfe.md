# Create New MFE Playbook

1. Crear ADR.
2. Definir dominio y ownership.
3. Elegir modelo de repo: monorepo o repo externo.
3. Definir rutas.
4. Definir exposed modules.
5. Definir contratos.
6. Definir fallback.
7. Definir tests.
8. Implementar remote.
9. Integrar en shell.
10. Medir carga y errores.

## Si el MFE vive en monorepo

- Crear app Nx y configuracion Module Federation.
- Consumir contratos desde `packages/contracts`.
- Validar con `nx lint`, `nx typecheck`, `nx build` del proyecto.

## Si el MFE vive en repo externo

- Crear repo con plantilla homologada de build, lint, test y deploy.
- Consumir contratos publicados (`@live-software/contracts`) con version fija.
- Ejecutar contract tests y smoke tests contra shell en CI.
- Publicar artefacto remoto versionado y actualizar manifiesto de shell.
