import { Request, Response } from 'express';
import prisma from '../models/pokemon';
import { Prisma } from '@prisma/client';
import { json } from 'stream/consumers';

export const getByOrder = async (req: Request, res: Response) => {
  try {
    const { order } = req.params;
    if (order === null) {
      res.status(404).json({ error: 'Id not found' });
    }

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
                name: true,
              },
            },
          },
        },
      },
    });

    if (!pokemon) {
      res.status(404).json({ error: 'Id not found' });
    }

    res.status(200).json(pokemon);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientValidationError) {
      if (error.message.includes('Argument')) {
        res.status(400).json({ message: 'El orden debe ser un numero' });
      }
    }
  }
};

export const getAllPokemon = async (req: Request, res: Response) => {
  const pokemon = await prisma.pokemon.findMany({
    select: {
      id: true,
      order: true,
      name: true,
      pokemon_types: {
        select: {
          type: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  res.status(200).json(pokemon);
};

export const createPokemon = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { order, name, types } = req.body;

    const typeIds = [];
    for (const typeName of types) {
      const type = await prisma.type.findFirst({
        where: { name: typeName },
      });
      if (!type) {
        res.status(400).json({ message: `El tipo ${typeName} no se encontró` });
        return;
      }
      typeIds.push(type.id);
    }

    if (!order || !name || !types) {
      res.status(400).json({ message: 'Todos los campos son obligatorios' });
      return;
    }
    if (typeIds.length === 0) {
      res
        .status(400)
        .json({ message: 'El pokemon debe tener al menos un tipo' });
    }

    if (!Array.isArray(types)) {
      res.status(400).json({ message: 'Types must be an array.' });
      return;
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
        pokemon_types: true,
      },
    });
    res.status(201).json(pokemon);
  } catch (error) {
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
  const pokemon = await prisma.pokemon.update({
    where: {
      order: Number(orderId),
    },
    data: {
      order: order,
      name: name,
    },
  });

  res.status(200).json(pokemon);
};

export const deletePokemon = async (req: Request, res: Response) => {
  const { order } = req.params;

  if (!order) {
    res.status(404).json({ message: 'Debe ingresar un order' });
  }

  const idPokemonTypes = await prisma.pokemon_types.findMany({
    where: {
      pokemon_id: Number(order),
    },
  });
  const ids = idPokemonTypes.map((items) => items.id);
  console.log(ids);

  const deletepokemonTypes = await prisma.pokemon_types.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
  const pokemon = await prisma.pokemon.delete({
    where: {
      id: Number(order),
    },
  });
  res.status(200).json({ message: `El order ${order} fue eliminado` });
};

export const getTypes = async (req: Request, res: Response) => {
  const types = await prisma.type.findMany();
  res.status(200).json(types);
};
