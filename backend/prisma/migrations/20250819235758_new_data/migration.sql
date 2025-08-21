/*
  Warnings:

  - Changed the type of `frequency` on the `Habit` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."Frequency" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY');

-- AlterTable
ALTER TABLE "public"."Habit" DROP COLUMN "frequency",
ADD COLUMN     "frequency" "public"."Frequency" NOT NULL;
