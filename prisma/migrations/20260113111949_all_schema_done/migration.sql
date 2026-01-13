-- CreateTable
CREATE TABLE "TenantRoom" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TenantRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ElectricMeter" (
    "id" TEXT NOT NULL,
    "meterNumber" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ElectricMeter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ElectricReading" (
    "id" TEXT NOT NULL,
    "meterId" TEXT NOT NULL,
    "readingDate" TIMESTAMP(3) NOT NULL,
    "currentReading" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ElectricReading_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ElectricBill" (
    "id" TEXT NOT NULL,
    "meterId" TEXT NOT NULL,
    "fromDate" TIMESTAMP(3) NOT NULL,
    "toDate" TIMESTAMP(3) NOT NULL,
    "unitsConsumed" INTEGER NOT NULL,
    "ratePerUnit" INTEGER NOT NULL,
    "totalAmount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ElectricBill_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ElectricMeter_meterNumber_key" ON "ElectricMeter"("meterNumber");

-- CreateIndex
CREATE UNIQUE INDEX "ElectricMeter_tenantId_key" ON "ElectricMeter"("tenantId");

-- AddForeignKey
ALTER TABLE "TenantRoom" ADD CONSTRAINT "TenantRoom_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TenantRoom" ADD CONSTRAINT "TenantRoom_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElectricMeter" ADD CONSTRAINT "ElectricMeter_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElectricReading" ADD CONSTRAINT "ElectricReading_meterId_fkey" FOREIGN KEY ("meterId") REFERENCES "ElectricMeter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElectricBill" ADD CONSTRAINT "ElectricBill_meterId_fkey" FOREIGN KEY ("meterId") REFERENCES "ElectricMeter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
