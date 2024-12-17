import { Request, Response } from 'express';
import { PokemonService } from '../services/pokemon.service';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const pokemonService = new PokemonService();
const prisma = new PrismaClient();

export const getByOrder = async (req: Request, res: Response) => {
  try {
    const { order } = req.params;
    const pokemon = await pokemonService.getByOrder(order);
    res.status(200).json(pokemon);
  } catch (error) {
    if (error instanceof Error && error.message === 'Pokemon not found') {
      res.status(404).json({ message: 'Pokemon not found' });
    }
    if (error instanceof Prisma.PrismaClientValidationError) {
      if (error.message.includes('Argument')) {
        res.status(400).json({ message: 'El order debe ser un numero' });
      }
    }
  }
};

export const getAllPokemon = async (req: Request, res: Response) => {
  try {
    const pokemons = await pokemonService.getAllPokemon();
    res.status(200).json(pokemons);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los pokemons' });
  }
};

export const createPokemon = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { order, name, types } = req.body;

    if (!order || !name || !types) {
      res.status(400).json({ message: 'Todos los campos son obligatorios' });
      return;
    }

    if (!Array.isArray(types)) {
      res.status(400).json({ message: 'Types debe ser un arreglo' });
      return;
    }
    const pokemon = await pokemonService.create(order, name, types);
    res.status(201).json(pokemon);
  } catch (error) {
    console.log(error);
    if (
      error instanceof Error &&
      error.message === 'El pokemon debe tener al menos un tipo'
    ) {
      res
        .status(400)
        .json({ message: 'El pokemon debe tener al menos un tipo' });
    }
    if (
      error instanceof Error &&
      error.message === 'Al menos un tipo no se encontro'
    ) {
      res.status(400).json({ message: 'Al menos un tipo no se encontro' });
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        res.status(400).json({ message: 'El pokemon ya se encuentra creado' });
      }
    }
  }
};

export const updatePokemon = async (req: Request, res: Response) => {
  const { order, name } = req.body;
  const { orderId } = req.params;
  const updatedPokemon = await pokemonService.update(order, name);
  //TODO validaciones
  res.status(200).json(updatedPokemon);
};

export const deletePokemon = async (req: Request, res: Response) => {
  try {
    const { order } = req.params;

    if (!order) {
      res.status(404).json({ message: 'Debe ingresar un order' });
    }

    const deletePokemon = await pokemonService.delete(Number(order));
    res.status(200).json({ message: 'El pokemon fue eliminado' });
  } catch (error) {
    console.log(error);
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      res.status(404).json({ message: 'Pokemon a eliminar no existe' });
    }
    res.status(500).json({ message: 'hubo un error' });
  }
};

export const getTypes = async (req: Request, res: Response) => {
  //TODO revisar por que se va por el error de getByOrder
  try {
    const types = await pokemonService.getAllTypes();
    res.status(200).json(types);
  } catch (error) {
    console.log(error);
  }
};
