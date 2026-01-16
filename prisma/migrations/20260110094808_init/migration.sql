-- CreateEnum
CREATE TYPE "VehicleType" AS ENUM ('car', 'bike', 'van', 'SUV');

-- CreateEnum
CREATE TYPE "AvailabilityStatus" AS ENUM ('available', 'booked');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('active', 'cancelled', 'returned');

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "vehicle_name" TEXT NOT NULL,
    "type" "VehicleType" NOT NULL,
    "registration_number" TEXT NOT NULL,
    "daily_rent_price" DOUBLE PRECISION NOT NULL,
    "availability_status" "AvailabilityStatus" NOT NULL DEFAULT 'available',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "rent_start_date" TIMESTAMP(3) NOT NULL,
    "rent_end_date" TIMESTAMP(3) NOT NULL,
    "total_price" DOUBLE PRECISION NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_registration_number_key" ON "Vehicle"("registration_number");

-- CreateIndex
CREATE INDEX "Vehicle_authorId_idx" ON "Vehicle"("authorId");

-- CreateIndex
CREATE INDEX "Booking_customer_id_idx" ON "Booking"("customer_id");

-- CreateIndex
CREATE INDEX "Booking_vehicle_id_idx" ON "Booking"("vehicle_id");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
