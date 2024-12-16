export interface PokemonDTO {
  id: number;
  order: number;
  name: string;
  types: PokemonTypeDTO[];
}

interface PokemonTypeDTO {
  id: number;
  name: string;
}
