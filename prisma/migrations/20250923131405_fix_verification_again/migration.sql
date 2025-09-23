-- AlterTable
ALTER TABLE "public"."verification" ALTER COLUMN "token" SET DEFAULT gen_random_uuid();
