/*
  Warnings:

  - The `answers` column on the `interviews` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `questions` column on the `interviews` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "interviews" DROP COLUMN "answers",
ADD COLUMN     "answers" TEXT[],
DROP COLUMN "questions",
ADD COLUMN     "questions" TEXT[];
