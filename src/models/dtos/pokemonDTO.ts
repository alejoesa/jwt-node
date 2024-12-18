export interface PokemonDTO {
  order: number;
  name: string;
  types: PokemonTypeDTO[];
}

interface PokemonTypeDTO {
  id: number;
  name: string;
}
