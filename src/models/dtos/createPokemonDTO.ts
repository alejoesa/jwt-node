import { PokemonDTO } from './pokemonDTO';

export interface CreatePokemonDTO extends Omit<PokemonDTO, 'id' | 'types'> {
  types: string[];
}
