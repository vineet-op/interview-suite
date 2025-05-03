/*
  Warnings:

  - Added the required column `aiResponse` to the `interviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "interviews" ADD COLUMN     "aiResponse" JSONB NOT NULL,
ALTER COLUMN "answers" SET NOT NULL,
ALTER COLUMN "answers" SET DATA TYPE TEXT,
ALTER COLUMN "questions" SET NOT NULL,
ALTER COLUMN "questions" SET DATA TYPE TEXT;
