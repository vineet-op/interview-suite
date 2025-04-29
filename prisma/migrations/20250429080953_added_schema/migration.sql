/*
  Warnings:

  - Added the required column `createdAt` to the `interviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "interviews" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "finalize" BOOLEAN,
ALTER COLUMN "questions" SET NOT NULL,
ALTER COLUMN "questions" SET DATA TYPE TEXT;
