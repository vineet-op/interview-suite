/*
  Warnings:

  - The primary key for the `interviews` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `userid` column on the `interviews` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "interviews" DROP CONSTRAINT "interviews_pkey",
DROP COLUMN "userid",
ADD COLUMN     "userid" SERIAL NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "interviews_pkey" PRIMARY KEY ("userid");
