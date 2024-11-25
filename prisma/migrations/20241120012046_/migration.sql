/*
  Warnings:

  - You are about to drop the `_pokemonTopokemon_type` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[order]` on the table `pokemon` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `pokemon_type` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_pokemonTopokemon_type" DROP CONSTRAINT "_pokemonTopokemon_type_A_fkey";

-- DropForeignKey
ALTER TABLE "_pokemonTopokemon_type" DROP CONSTRAINT "_pokemonTopokemon_type_B_fkey";

-- DropTable
DROP TABLE "_pokemonTopokemon_type";

-- CreateTable
CREATE TABLE "pokemon_on_type" (
    "pokemon_id" INTEGER NOT NULL,
    "pokemon_type_id" INTEGER NOT NULL,

    CONSTRAINT "pokemon_on_type_pkey" PRIMARY KEY ("pokemon_id","pokemon_type_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pokemon_order_key" ON "pokemon"("order");

-- CreateIndex
CREATE UNIQUE INDEX "pokemon_type_name_key" ON "pokemon_type"("name");

-- AddForeignKey
ALTER TABLE "pokemon_on_type" ADD CONSTRAINT "pokemon_on_type_pokemon_id_fkey" FOREIGN KEY ("pokemon_id") REFERENCES "pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pokemon_on_type" ADD CONSTRAINT "pokemon_on_type_pokemon_type_id_fkey" FOREIGN KEY ("pokemon_type_id") REFERENCES "pokemon_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;
