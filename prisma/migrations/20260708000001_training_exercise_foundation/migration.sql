CREATE TYPE "SupportedLocale" AS ENUM ('EN', 'ES');
CREATE TYPE "ExerciseDifficulty" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');
CREATE TYPE "ExerciseMechanics" AS ENUM ('COMPOUND', 'ISOLATION');
CREATE TYPE "MovementPattern" AS ENUM ('SQUAT', 'HINGE', 'HORIZONTAL_PUSH', 'VERTICAL_PUSH', 'HORIZONTAL_PULL', 'VERTICAL_PULL', 'LUNGE', 'CARRY', 'ROTATION', 'ANTI_ROTATION', 'CORE', 'GAIT', 'OTHER');
CREATE TYPE "ExerciseLaterality" AS ENUM ('BILATERAL', 'UNILATERAL', 'ALTERNATING', 'ASYMMETRICAL');
CREATE TYPE "KineticChain" AS ENUM ('OPEN', 'CLOSED', 'MIXED');
CREATE TYPE "ResistanceCurve" AS ENUM ('CONSTANT', 'ASCENDING', 'DESCENDING', 'VARIABLE', 'BODYWEIGHT_VARIABLE', 'UNKNOWN');
CREATE TYPE "DemandLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');
CREATE TYPE "BodyRegion" AS ENUM ('UPPER_BODY', 'LOWER_BODY', 'CORE', 'FULL_BODY');
CREATE TYPE "MuscleRole" AS ENUM ('PRIMARY', 'SECONDARY', 'STABILIZER');
CREATE TYPE "StimulusLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');
CREATE TYPE "EquipmentCategory" AS ENUM ('BODYWEIGHT', 'FREE_WEIGHT', 'MACHINE', 'CABLE', 'BAND', 'SUPPORT', 'OTHER');
CREATE TYPE "EquipmentRequirement" AS ENUM ('REQUIRED', 'OPTIONAL', 'ALTERNATIVE');
CREATE TYPE "ExerciseTipType" AS ENUM ('SETUP', 'CUE', 'COMMON_MISTAKE', 'SAFETY', 'PROGRESSION');
CREATE TYPE "ExerciseMediaKind" AS ENUM ('IMAGE', 'VIDEO', 'ANIMATION', 'OTHER');
CREATE TYPE "EvidenceSourceType" AS ENUM ('PEER_REVIEWED_REVIEW', 'PEER_REVIEWED_STUDY', 'TEXTBOOK', 'PROFESSIONAL_GUIDELINE', 'CURATED_REFERENCE');

CREATE TABLE "exercises" (
    "id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "difficulty" "ExerciseDifficulty" NOT NULL,
    "mechanics" "ExerciseMechanics" NOT NULL,
    "movement_pattern" "MovementPattern" NOT NULL,
    "laterality" "ExerciseLaterality" NOT NULL,
    "kinetic_chain" "KineticChain" NOT NULL,
    "resistance_curve" "ResistanceCurve" NOT NULL,
    "technical_demand" "DemandLevel" NOT NULL,
    "mobility_demand" "DemandLevel" NOT NULL,
    "stability_demand" "DemandLevel" NOT NULL,
    "axial_load" "DemandLevel" NOT NULL,
    "lumbar_demand" "DemandLevel" NOT NULL,
    "shoulder_demand" "DemandLevel" NOT NULL,
    "knee_demand" "DemandLevel" NOT NULL,
    "setup_complexity" "DemandLevel" NOT NULL DEFAULT 'LOW',
    "space_requirement" "DemandLevel" NOT NULL DEFAULT 'LOW',
    "requires_spotter" BOOLEAN NOT NULL DEFAULT false,
    "gym_required" BOOLEAN NOT NULL DEFAULT false,
    "home_friendly" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exercises_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "exercise_translations" (
    "id" UUID NOT NULL,
    "exercise_id" UUID NOT NULL,
    "locale" "SupportedLocale" NOT NULL,
    "name" TEXT NOT NULL,
    "aliases" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "summary" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "exercise_translations_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "muscle_groups" (
    "id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "region" "BodyRegion" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "muscle_groups_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "muscle_group_translations" (
    "id" UUID NOT NULL,
    "muscle_group_id" UUID NOT NULL,
    "locale" "SupportedLocale" NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "muscle_group_translations_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "equipment" (
    "id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "category" "EquipmentCategory" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "equipment_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "equipment_translations" (
    "id" UUID NOT NULL,
    "equipment_id" UUID NOT NULL,
    "locale" "SupportedLocale" NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "equipment_translations_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "exercise_muscles" (
    "exercise_id" UUID NOT NULL,
    "muscle_group_id" UUID NOT NULL,
    "role" "MuscleRole" NOT NULL,
    "stimulus_level" "StimulusLevel" NOT NULL,
    "notes" TEXT,

    CONSTRAINT "exercise_muscles_pkey" PRIMARY KEY ("exercise_id","muscle_group_id")
);

CREATE TABLE "exercise_equipment" (
    "exercise_id" UUID NOT NULL,
    "equipment_id" UUID NOT NULL,
    "requirement" "EquipmentRequirement" NOT NULL,

    CONSTRAINT "exercise_equipment_pkey" PRIMARY KEY ("exercise_id","equipment_id")
);

CREATE TABLE "exercise_tips" (
    "id" UUID NOT NULL,
    "exercise_id" UUID NOT NULL,
    "type" "ExerciseTipType" NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "exercise_tips_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "exercise_tip_translations" (
    "id" UUID NOT NULL,
    "tip_id" UUID NOT NULL,
    "locale" "SupportedLocale" NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "exercise_tip_translations_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "exercise_media" (
    "id" UUID NOT NULL,
    "exercise_id" UUID NOT NULL,
    "kind" "ExerciseMediaKind" NOT NULL,
    "url" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "exercise_media_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "exercise_media_translations" (
    "id" UUID NOT NULL,
    "media_id" UUID NOT NULL,
    "locale" "SupportedLocale" NOT NULL,
    "alt_text" TEXT,

    CONSTRAINT "exercise_media_translations_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "exercise_references" (
    "id" UUID NOT NULL,
    "exercise_id" UUID NOT NULL,
    "source_type" "EvidenceSourceType" NOT NULL,
    "title" TEXT NOT NULL,
    "citation" TEXT,
    "url" TEXT,
    "notes" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "exercise_references_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "exercises_slug_key" ON "exercises"("slug");
CREATE UNIQUE INDEX "exercise_translations_exercise_id_locale_key" ON "exercise_translations"("exercise_id", "locale");
CREATE UNIQUE INDEX "muscle_groups_slug_key" ON "muscle_groups"("slug");
CREATE UNIQUE INDEX "muscle_group_translations_muscle_group_id_locale_key" ON "muscle_group_translations"("muscle_group_id", "locale");
CREATE UNIQUE INDEX "equipment_slug_key" ON "equipment"("slug");
CREATE UNIQUE INDEX "equipment_translations_equipment_id_locale_key" ON "equipment_translations"("equipment_id", "locale");
CREATE UNIQUE INDEX "exercise_tip_translations_tip_id_locale_key" ON "exercise_tip_translations"("tip_id", "locale");
CREATE UNIQUE INDEX "exercise_media_translations_media_id_locale_key" ON "exercise_media_translations"("media_id", "locale");

ALTER TABLE "exercise_translations" ADD CONSTRAINT "exercise_translations_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "muscle_group_translations" ADD CONSTRAINT "muscle_group_translations_muscle_group_id_fkey" FOREIGN KEY ("muscle_group_id") REFERENCES "muscle_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "equipment_translations" ADD CONSTRAINT "equipment_translations_equipment_id_fkey" FOREIGN KEY ("equipment_id") REFERENCES "equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "exercise_muscles" ADD CONSTRAINT "exercise_muscles_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "exercise_muscles" ADD CONSTRAINT "exercise_muscles_muscle_group_id_fkey" FOREIGN KEY ("muscle_group_id") REFERENCES "muscle_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "exercise_equipment" ADD CONSTRAINT "exercise_equipment_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "exercise_equipment" ADD CONSTRAINT "exercise_equipment_equipment_id_fkey" FOREIGN KEY ("equipment_id") REFERENCES "equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "exercise_tips" ADD CONSTRAINT "exercise_tips_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "exercise_tip_translations" ADD CONSTRAINT "exercise_tip_translations_tip_id_fkey" FOREIGN KEY ("tip_id") REFERENCES "exercise_tips"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "exercise_media" ADD CONSTRAINT "exercise_media_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "exercise_media_translations" ADD CONSTRAINT "exercise_media_translations_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "exercise_media"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "exercise_references" ADD CONSTRAINT "exercise_references_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;
