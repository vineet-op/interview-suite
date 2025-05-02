/*
  Warnings:

  - You are about to drop the column `amount` on the `interviews` table. All the data in the column will be lost.
  - You are about to drop the column `finalize` on the `interviews` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `interviews` table. All the data in the column will be lost.
  - You are about to drop the column `techstack` on the `interviews` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `interviews` table. All the data in the column will be lost.
  - The `questions` column on the `interviews` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `experience` to the `interviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobDescription` to the `interviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "interviews" DROP COLUMN "amount",
DROP COLUMN "finalize",
DROP COLUMN "level",
DROP COLUMN "techstack",
DROP COLUMN "type",
ADD COLUMN     "answers" TEXT[],
ADD COLUMN     "experience" TEXT NOT NULL,
ADD COLUMN     "jobDescription" TEXT NOT NULL,
ADD COLUMN     "username" TEXT,
DROP COLUMN "questions",
ADD COLUMN     "questions" TEXT[];
