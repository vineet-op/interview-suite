/*
  Warnings:

  - Added the required column `details` to the `interviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `overallRating` to the `interviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "interviews" ADD COLUMN     "details" JSONB NOT NULL,
ADD COLUMN     "improvements" TEXT[],
ADD COLUMN     "overallRating" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "strengths" TEXT[];
