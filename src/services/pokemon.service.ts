import { PrismaClient } from '@prisma/client';
import { Pokemon, PokemonType } from '../models/entities/pokemon.interface';

const prisma = new PrismaClient();

export class PokemonService {
  async getAll(): Promise<Pokemon[]> {
    const pokemons = await prisma.pokemon.findMany({
      select: {
        id: true,
        order: true,
        name: true,
        pokemon_types: {
          select: {
            type: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return pokemons.map((pokemon) => ({
      id: pokemon.id,
      order: pokemon.order,
      name: pokemon.name,
      types: pokemon.pokemon_types.map((pt) => ({
        id: pt.type.id,
        name: pt.type.name,
      })),
    }));
  }

  async getByOrder(order: string): Promise<Pokemon> {
    const pokemon = await prisma.pokemon.findFirst({
      where: {
        order: Number(order),
      },
      select: {
        id: true,
        order: true,
        name: true,
        pokemon_types: {
          select: {
            type: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
    if (!pokemon) {
      throw new Error('Pokemon not found');
    }

    return {
      id: pokemon.id,
      order: pokemon.order,
      name: pokemon.name,
      types: pokemon.pokemon_types.map((pt) => ({
        id: pt.type.id,
        name: pt.type.name,
      })),
    };
  }

  async create(order: number, name: string, types: string[]): Promise<Pokemon> {
    const typeIds = [];
    for (const typeName of types) {
      const type = await prisma.type.findFirst({
        where: { name: typeName },
      });
      if (!type) {
        throw new Error('Al menos un tipo no se encontro');
      }
      typeIds.push(type.id);
    }

    if (typeIds.length === 0) {
      throw new Error('El pokemon debe tener al menos un tipo');
    }

    const pokemon = await prisma.pokemon.create({
      data: {
        order,
        name,
        pokemon_types: {
          create: typeIds.map((typeId: number) => ({
            type: { connect: { id: typeId } },
          })),
        },
      },
      include: {
        pokemon_types: {
          include: {
            type: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return {
      id: pokemon.id,
      order: pokemon.order,
      name: pokemon.name,
      types: pokemon.pokemon_types.map((pt) => ({
        id: pt.type.id,
        name: pt.type.name,
      })),
    };
  }

  async update(order: number, name: string): Promise<Pokemon> {
    const updatePokemon = await prisma.pokemon.update({
      where: {
        order: order,
      },
      data: {
        order: order,
        name: name,
      },
      include: {
        pokemon_types: {
          include: {
            type: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return {
      id: updatePokemon.id,
      order: updatePokemon.order,
      name: updatePokemon.name,
      types: updatePokemon.pokemon_types.map((pt) => ({
        id: pt.type.id,
        name: pt.type.name,
      })),
    };
  }

  async delete(order: number) {
    const idPokemon = await prisma.pokemon.findFirst({
      where: {
        order: order,
      },
    });

    const idPokemonTypes = await prisma.pokemon_types.findMany({
      where: {
        pokemon_id: idPokemon?.id,
      },
    });
    const ids = idPokemonTypes.map((items) => items.id);

    const deletepokemonTypes = await prisma.pokemon_types.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    const deletePokemon = await prisma.pokemon.delete({
      where: {
        id: idPokemon?.id,
      },
    });
  }

  async getAllTypes(): Promise<PokemonType[]> {
    return await prisma.type.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }
}
