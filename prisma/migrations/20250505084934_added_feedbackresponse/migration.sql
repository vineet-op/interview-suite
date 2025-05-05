/*
  Warnings:

  - The primary key for the `interviews` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `details` on the `interviews` table. All the data in the column will be lost.
  - You are about to drop the column `improvements` on the `interviews` table. All the data in the column will be lost.
  - You are about to drop the column `overallRating` on the `interviews` table. All the data in the column will be lost.
  - You are about to drop the column `strengths` on the `interviews` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "interviews" DROP CONSTRAINT "interviews_pkey",
DROP COLUMN "details",
DROP COLUMN "improvements",
DROP COLUMN "overallRating",
DROP COLUMN "strengths",
ADD COLUMN     "feedbackResponse" JSONB,
ALTER COLUMN "interviewId" DROP DEFAULT,
ALTER COLUMN "interviewId" SET DATA TYPE TEXT,
ADD CONSTRAINT "interviews_pkey" PRIMARY KEY ("interviewId");
DROP SEQUENCE "interviews_interviewId_seq";
