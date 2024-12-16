export interface Pokemon {
  id: number;
  order: number;
  name: string;
  types: PokemonType[];
}

export interface PokemonType {
  id: number;
  name: string;
}
