import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "projects_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" jsonb,
  	"image_id" integer,
  	"image2_id" integer
  );
  
  CREATE TABLE "_projects_v_version_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" jsonb,
  	"image_id" integer,
  	"image2_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "updates_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" jsonb,
  	"image_id" integer,
  	"image2_id" integer
  );
  
  CREATE TABLE "_updates_v_version_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" jsonb,
  	"image_id" integer,
  	"image2_id" integer,
  	"_uuid" varchar
  );
  
  ALTER TABLE "projects_sections" ADD CONSTRAINT "projects_sections_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_sections" ADD CONSTRAINT "projects_sections_image2_id_media_id_fk" FOREIGN KEY ("image2_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_sections" ADD CONSTRAINT "projects_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_sections" ADD CONSTRAINT "_projects_v_version_sections_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_version_sections" ADD CONSTRAINT "_projects_v_version_sections_image2_id_media_id_fk" FOREIGN KEY ("image2_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_version_sections" ADD CONSTRAINT "_projects_v_version_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "updates_sections" ADD CONSTRAINT "updates_sections_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "updates_sections" ADD CONSTRAINT "updates_sections_image2_id_media_id_fk" FOREIGN KEY ("image2_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "updates_sections" ADD CONSTRAINT "updates_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."updates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_updates_v_version_sections" ADD CONSTRAINT "_updates_v_version_sections_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_updates_v_version_sections" ADD CONSTRAINT "_updates_v_version_sections_image2_id_media_id_fk" FOREIGN KEY ("image2_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_updates_v_version_sections" ADD CONSTRAINT "_updates_v_version_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_updates_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "projects_sections_order_idx" ON "projects_sections" USING btree ("_order");
  CREATE INDEX "projects_sections_parent_id_idx" ON "projects_sections" USING btree ("_parent_id");
  CREATE INDEX "projects_sections_image_idx" ON "projects_sections" USING btree ("image_id");
  CREATE INDEX "projects_sections_image2_idx" ON "projects_sections" USING btree ("image2_id");
  CREATE INDEX "_projects_v_version_sections_order_idx" ON "_projects_v_version_sections" USING btree ("_order");
  CREATE INDEX "_projects_v_version_sections_parent_id_idx" ON "_projects_v_version_sections" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_sections_image_idx" ON "_projects_v_version_sections" USING btree ("image_id");
  CREATE INDEX "_projects_v_version_sections_image2_idx" ON "_projects_v_version_sections" USING btree ("image2_id");
  CREATE INDEX "updates_sections_order_idx" ON "updates_sections" USING btree ("_order");
  CREATE INDEX "updates_sections_parent_id_idx" ON "updates_sections" USING btree ("_parent_id");
  CREATE INDEX "updates_sections_image_idx" ON "updates_sections" USING btree ("image_id");
  CREATE INDEX "updates_sections_image2_idx" ON "updates_sections" USING btree ("image2_id");
  CREATE INDEX "_updates_v_version_sections_order_idx" ON "_updates_v_version_sections" USING btree ("_order");
  CREATE INDEX "_updates_v_version_sections_parent_id_idx" ON "_updates_v_version_sections" USING btree ("_parent_id");
  CREATE INDEX "_updates_v_version_sections_image_idx" ON "_updates_v_version_sections" USING btree ("image_id");
  CREATE INDEX "_updates_v_version_sections_image2_idx" ON "_updates_v_version_sections" USING btree ("image2_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "projects_sections" CASCADE;
  DROP TABLE "_projects_v_version_sections" CASCADE;
  DROP TABLE "updates_sections" CASCADE;
  DROP TABLE "_updates_v_version_sections" CASCADE;`)
}
