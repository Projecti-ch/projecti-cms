import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- Create categories table
    CREATE TABLE IF NOT EXISTS "categories" (
      "id" serial PRIMARY KEY NOT NULL,
      "label" varchar NOT NULL,
      "slug" varchar NOT NULL,
      "description" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    -- Create unique index on slug
    CREATE UNIQUE INDEX IF NOT EXISTS "categories_slug_idx" ON "categories" USING btree ("slug");
    CREATE INDEX IF NOT EXISTS "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "categories_created_at_idx" ON "categories" USING btree ("created_at");

    -- Add new category_id column as relationship to categories (if not exists)
    ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "category_id" integer;
    ALTER TABLE "_projects_v" ADD COLUMN IF NOT EXISTS "version_category_id" integer;

    -- Add foreign key constraint (ignore if exists)
    DO $$ BEGIN
      ALTER TABLE "projects" ADD CONSTRAINT "projects_category_id_categories_id_fk" 
        FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    
    DO $$ BEGIN
      ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_category_id_categories_id_fk" 
        FOREIGN KEY ("version_category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    -- Create index on category_id
    CREATE INDEX IF NOT EXISTS "projects_category_idx" ON "projects" USING btree ("category_id");
    CREATE INDEX IF NOT EXISTS "_projects_v_version_category_idx" ON "_projects_v" USING btree ("version_category_id");

    -- Drop old category column and enum (after data migration)
    ALTER TABLE "projects" DROP COLUMN IF EXISTS "category";
    ALTER TABLE "_projects_v" DROP COLUMN IF EXISTS "version_category";
    DROP TYPE IF EXISTS "enum_projects_category";
    DROP TYPE IF EXISTS "enum__projects_v_version_category";
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    -- Recreate old enum and column
    CREATE TYPE "enum_projects_category" AS ENUM('planung', 'analyse');
    CREATE TYPE "enum__projects_v_version_category" AS ENUM('planung', 'analyse');
    ALTER TABLE "projects" ADD COLUMN "category" "enum_projects_category";
    ALTER TABLE "_projects_v" ADD COLUMN "version_category" "enum__projects_v_version_category";

    -- Drop foreign key constraints
    ALTER TABLE "projects" DROP CONSTRAINT IF EXISTS "projects_category_id_categories_id_fk";
    ALTER TABLE "_projects_v" DROP CONSTRAINT IF EXISTS "_projects_v_version_category_id_categories_id_fk";

    -- Drop indexes
    DROP INDEX IF EXISTS "projects_category_idx";
    DROP INDEX IF EXISTS "_projects_v_version_category_idx";

    -- Drop category_id columns
    ALTER TABLE "projects" DROP COLUMN IF EXISTS "category_id";
    ALTER TABLE "_projects_v" DROP COLUMN IF EXISTS "version_category_id";

    -- Drop categories table
    DROP TABLE IF EXISTS "categories" CASCADE;
  `)
}
