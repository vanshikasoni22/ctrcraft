/*
  Warnings:

  - A unique constraint covering the columns `[identifier,token]` on the table `verification` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "verification_identifier_token_key" ON "public"."verification"("identifier", "token");
