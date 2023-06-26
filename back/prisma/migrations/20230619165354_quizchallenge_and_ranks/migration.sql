-- AlterTable
ALTER TABLE "users" ADD COLUMN     "gacha_fragment" INTEGER DEFAULT 0;

-- CreateTable
CREATE TABLE "quiz_challenge" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "end_time" INTEGER,
    "points_gain" INTEGER DEFAULT 0,

    CONSTRAINT "quiz_challenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rank" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "points" INTEGER,
    "wins" INTEGER DEFAULT 0,
    "loses" INTEGER DEFAULT 0,

    CONSTRAINT "rank_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "quiz_challenge" ADD CONSTRAINT "quiz_challenge_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "rank" ADD CONSTRAINT "rank_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
