-- CreateTable
CREATE TABLE "interviews" (
    "userid" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "techstack" TEXT NOT NULL,
    "amount" TEXT NOT NULL,

    CONSTRAINT "interviews_pkey" PRIMARY KEY ("userid")
);
