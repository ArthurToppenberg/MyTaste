/*
  Warnings:

  - You are about to drop the `Client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Restaurant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Client" DROP CONSTRAINT "Client_id_fkey";

-- DropForeignKey
ALTER TABLE "Restaurant" DROP CONSTRAINT "Restaurant_id_fkey";

-- DropTable
DROP TABLE "Client";

-- DropTable
DROP TABLE "Restaurant";

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "Permission";

-- CreateTable
CREATE TABLE "account" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "restaurant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "account_email_key" ON "account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "restaurant_name_key" ON "restaurant"("name");

-- CreateIndex
CREATE UNIQUE INDEX "restaurant_location_key" ON "restaurant"("location");

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_id_fkey" FOREIGN KEY ("id") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurant" ADD CONSTRAINT "restaurant_id_fkey" FOREIGN KEY ("id") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
