# Training Exercise Model

## Decision

Exercise data describes stable exercise identity and context:

- movement pattern;
- mechanics;
- laterality;
- kinetic chain;
- resistance curve;
- qualitative demand profile;
- muscle roles;
- equipment requirements;
- localized educational text;
- references.

It does not classify an exercise as a fixed hypertrophy, strength, endurance, or
fat-loss stimulus. The actual training stimulus belongs to future prescription
data: load, repetitions, sets, rest, tempo, range of motion, volume,
progression, and proximity to failure.

## Evidence boundary

The initial model is intentionally conservative. Research on resistance training
does not support treating a single exercise name as a complete adaptation
target. Loading ranges, effort and proximity to failure can change the expected
adaptation substantially.

Reference examples used for this foundation:

- Schoenfeld BJ, Grgic J, Van Every DW, Plotkin DL. "Loading Recommendations
  for Muscle Strength, Hypertrophy, and Local Endurance". Sports. 2021.
  https://doi.org/10.3390/sports9020032
- Refalo MC, Helms ER, Trexler ET, Hamilton DL, Fyfe JJ. "Influence of
  Resistance Training Proximity-to-Failure on Skeletal Muscle Hypertrophy".
  Sports Medicine. 2023. https://doi.org/10.1007/s40279-022-01784-y

## Muscle involvement

The database uses qualitative muscle participation:

- `primary`;
- `secondary`;
- `stabilizer`;
- `low`, `medium`, `high` stimulus level.

It intentionally avoids hard-coded muscle percentages. Percentages would imply
precision that is not stable across technique, anatomy, load, range of motion,
fatigue, equipment setup, and measurement method.

## Localization

Exercise identity and biomechanical metadata are stored once. Translatable
content is stored in translation tables:

- `exercise_translations`;
- `muscle_group_translations`;
- `equipment_translations`;
- `exercise_tip_translations`;
- `exercise_media_translations`.

The API resolves a single locale per request with `?locale=es|en` and falls back
to English.

## Seed scope

The current seed is a small persisted proof of model, not a complete exercise
catalog. A complete catalog should be added through a dedicated curation/import
issue with source tracking, review status, and repeatable import scripts.

## Intentionally deferred

- routine builder;
- workout prescription;
- set/rep/load tracking;
- per-user exercise ownership;
- media upload;
- complete exercise catalog import;
- exercise variations taxonomy;
- evidence review workflow.
