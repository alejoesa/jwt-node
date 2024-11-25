/*
  Warnings:

  - Added the required column `name` to the `pokemon_on_type` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pokemon_on_type" ADD COLUMN     "name" TEXT NOT NULL;
