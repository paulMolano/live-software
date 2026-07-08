# Database Strategy

## Decision

PostgreSQL + Prisma.

## Desarrollo local

Docker Compose.

Servicios:

- postgres;
- redis futuro;
- keycloak;
- api.

## Implementacion inicial

La primera base tecnica usa Prisma ORM 7 con configuracion en
`prisma.config.ts` y schema en `prisma/schema.prisma`.

El schema inicial incluye `User` como placeholder minimo para ownership y
futura autenticacion.

La primera base de producto anade el foundation de training para ejercicios:

- `Exercise` como identidad y perfil biomecanico;
- tablas de traduccion para textos localizables;
- `MuscleGroup` y `Equipment`;
- relaciones ejercicio-musculo y ejercicio-equipamiento;
- tips/media placeholders;
- referencias por ejercicio.

No incluye dashboard, finance, learning, habits, integracion con Keycloak ni
rutinas de entrenamiento.

La URL local se configura con `DATABASE_URL`:

```txt
postgresql://live_software:live_software@localhost:5432/live_software?schema=public
```

## Primeras entidades

- User;
- Exercise;
- ExerciseTranslation;
- MuscleGroup;
- MuscleGroupTranslation;
- Equipment;
- EquipmentTranslation;
- ExerciseTip;
- ExerciseMedia;
- ExerciseReference.

## Futuras entidades

- WorkoutRoutine;
- WorkoutSession;
- DashboardLayout;
- FinanceExpense;
- FinanceDebt;
- Habit;
- LearningItem.
