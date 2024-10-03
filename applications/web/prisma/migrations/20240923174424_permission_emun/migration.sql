/*
  Warnings:

  - The `permission` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('ADMIN', 'USER', 'RESTORANT');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "permission",
ADD COLUMN     "permission" "Permission" NOT NULL DEFAULT 'USER';
