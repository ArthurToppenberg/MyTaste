/*
  Warnings:

  - The values [DEFUALT] on the enum `Permission` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `type` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Permission_new" AS ENUM ('DEVELOPER', 'ADMIN', 'USER');
ALTER TABLE "User" ALTER COLUMN "permission" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "permission" TYPE "Permission_new" USING ("permission"::text::"Permission_new");
ALTER TYPE "Permission" RENAME TO "Permission_old";
ALTER TYPE "Permission_new" RENAME TO "Permission";
DROP TYPE "Permission_old";
ALTER TABLE "User" ALTER COLUMN "permission" SET DEFAULT 'USER';
COMMIT;

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_id_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "type",
ALTER COLUMN "permission" SET DEFAULT 'USER';

-- DropTable
DROP TABLE "Profile";

-- DropEnum
DROP TYPE "Type";

-- CreateTable
CREATE TABLE "Client" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Restaurant" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restaurant" ADD CONSTRAINT "Restaurant_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
