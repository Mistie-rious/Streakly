/*
  Warnings:

  - You are about to drop the `Reminder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Reminder" DROP CONSTRAINT "Reminder_habitId_fkey";

-- DropTable
DROP TABLE "public"."Reminder";
