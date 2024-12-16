import { PokemonDTO } from "./pokemonDTO";

export interface UpdatePokemonDTO extends Partial<Omit<PokemonDTO, 'id' | 'types' {
types?: string[];
}