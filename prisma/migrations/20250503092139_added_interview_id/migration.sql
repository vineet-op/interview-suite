/*
  Warnings:

  - The primary key for the `interviews` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userid` on the `interviews` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "interviews" DROP CONSTRAINT "interviews_pkey",
DROP COLUMN "userid",
ADD COLUMN     "interviewId" SERIAL NOT NULL,
ADD CONSTRAINT "interviews_pkey" PRIMARY KEY ("interviewId");
