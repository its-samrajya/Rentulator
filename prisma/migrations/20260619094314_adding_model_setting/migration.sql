-- CreateTable
CREATE TABLE "Setting" (
    "id" TEXT NOT NULL,
    "electricRate" INTEGER NOT NULL,
    "dueDate" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("id")
);
