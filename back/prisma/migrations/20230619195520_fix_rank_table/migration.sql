/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `rank` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_unique" ON "rank"("user_id");
