/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Restaurant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[location]` on the table `Restaurant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_name_key" ON "Restaurant"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_location_key" ON "Restaurant"("location");
