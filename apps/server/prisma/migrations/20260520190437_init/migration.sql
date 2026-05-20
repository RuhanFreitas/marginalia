/*
  Warnings:

  - You are about to drop the column `contentPt` on the `Marginalia` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Marginalia" DROP COLUMN "contentPt",
ADD COLUMN     "title" TEXT NOT NULL DEFAULT '';
