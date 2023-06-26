/*
  Warnings:

  - You are about to drop the column `image_url` on the `idols` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `idols` table. All the data in the column will be lost.
  - You are about to drop the column `rarity` on the `idols` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `idols` table. All the data in the column will be lost.
  - Added the required column `card_id` to the `idols` table without a default value. This is not possible if the table is not empty.
  - Added the required column `era_id` to the `idols` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "idols" DROP COLUMN "image_url",
DROP COLUMN "name",
DROP COLUMN "rarity",
DROP COLUMN "type",
ADD COLUMN     "card_id" INTEGER NOT NULL,
ADD COLUMN     "era_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "sessions" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
