export interface Pokemon {
    id: number;
    order: number;
    name: string;
    types: PokemonType[];
}

interface PokemonType {
    id: number;
    name: string;
}