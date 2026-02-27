import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "projects" ADD COLUMN "category_id" integer;
  ALTER TABLE "_projects_v" ADD COLUMN "version_category_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "categories_id" integer;
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  ALTER TABLE "projects" ADD CONSTRAINT "projects_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_category_id_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "projects_category_idx" ON "projects" USING btree ("category_id");
  CREATE INDEX "_projects_v_version_version_category_idx" ON "_projects_v" USING btree ("version_category_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  ALTER TABLE "projects" DROP COLUMN "category";
  ALTER TABLE "_projects_v" DROP COLUMN "version_category";
  DROP TYPE "public"."enum_projects_category";
  DROP TYPE "public"."enum__projects_v_version_category";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_projects_category" AS ENUM('planung', 'analyse');
  CREATE TYPE "public"."enum__projects_v_version_category" AS ENUM('planung', 'analyse');
  ALTER TABLE "categories" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "categories" CASCADE;
  ALTER TABLE "projects" DROP CONSTRAINT "projects_category_id_categories_id_fk";
  
  ALTER TABLE "_projects_v" DROP CONSTRAINT "_projects_v_version_category_id_categories_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_categories_fk";
  
  DROP INDEX "projects_category_idx";
  DROP INDEX "_projects_v_version_version_category_idx";
  DROP INDEX "payload_locked_documents_rels_categories_id_idx";
  ALTER TABLE "projects" ADD COLUMN "category" "enum_projects_category";
  ALTER TABLE "_projects_v" ADD COLUMN "version_category" "enum__projects_v_version_category";
  ALTER TABLE "projects" DROP COLUMN "category_id";
  ALTER TABLE "_projects_v" DROP COLUMN "version_category_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "categories_id";`)
}
