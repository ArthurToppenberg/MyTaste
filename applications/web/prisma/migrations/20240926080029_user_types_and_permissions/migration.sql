/*
  Warnings:

  - The values [USER,RESTORANT] on the enum `Permission` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('USER', 'RESTORANT', 'BOTH');

-- AlterEnum
BEGIN;
CREATE TYPE "Permission_new" AS ENUM ('DEVELOPER', 'ADMIN', 'DEFUALT');
ALTER TABLE "User" ALTER COLUMN "permission" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "permission" TYPE "Permission_new" USING ("permission"::text::"Permission_new");
ALTER TYPE "Permission" RENAME TO "Permission_old";
ALTER TYPE "Permission_new" RENAME TO "Permission";
DROP TYPE "Permission_old";
ALTER TABLE "User" ALTER COLUMN "permission" SET DEFAULT 'DEFUALT';
COMMIT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "type" "Type" NOT NULL DEFAULT 'USER',
ALTER COLUMN "permission" SET DEFAULT 'DEFUALT';
