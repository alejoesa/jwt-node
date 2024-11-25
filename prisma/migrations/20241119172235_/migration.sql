-- CreateTable
CREATE TABLE "pokemon" (
    "id" SERIAL NOT NULL,
    "order" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pokemon_type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "pokemon_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_pokemonTopokemon_type" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "pokemon_name_key" ON "pokemon"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_pokemonTopokemon_type_AB_unique" ON "_pokemonTopokemon_type"("A", "B");

-- CreateIndex
CREATE INDEX "_pokemonTopokemon_type_B_index" ON "_pokemonTopokemon_type"("B");

-- AddForeignKey
ALTER TABLE "_pokemonTopokemon_type" ADD CONSTRAINT "_pokemonTopokemon_type_A_fkey" FOREIGN KEY ("A") REFERENCES "pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_pokemonTopokemon_type" ADD CONSTRAINT "_pokemonTopokemon_type_B_fkey" FOREIGN KEY ("B") REFERENCES "pokemon_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;
