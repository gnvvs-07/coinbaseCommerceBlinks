-- CreateTable
CREATE TABLE "Blink" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT,
    "description" TEXT,
    "price" TEXT,
    "walletAddress" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "support_email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Blink_pkey" PRIMARY KEY ("id")
);

