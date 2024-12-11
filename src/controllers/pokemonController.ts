import {Request, Response} from "express";
import prisma from '../models/pokemon';


export const getById = async (req: Request, res: Response) => {
    try {
        const {id} = req.params


        const pokemon = await prisma.pokemon.findFirst({
            where: {
                id: Number(id)
            }
        })
        //Validations
        if (pokemon === null) {
            res.status(404).json({error: 'Id not found'})
        }
        res.status(200).json(pokemon)
    } catch (e) {
        console.log(e)
    }

}


export const getAllPokemon = async (req: Request, res: Response) => {

    try {
        const pokemon = await prisma.pokemon.findMany({
            select: {
                id: true,
                order: true,
                name: true,
                pokemon_types: {
                    select: {
                        type: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        })

        res.status(200).json(pokemon)
    } catch (e) {
        console.log(e)
    }

}


export const createPokemon = async (req: Request, res: Response): Promise<void> => {
    try {
        const {order, name, types} = req.body;
        const firstType = await prisma.type.findFirst({
            where: {
                name: types[0]
            }
        })
        if (!firstType) {
            res.status(400).json({error: `El tipo ${types[0]} no se encontro`})
            return
        }
        const secondType = await prisma.type.findFirst({
            where: {
                name: types[1]
            }
        })
        if (!secondType) {
            res.status(400).json({error: `El tipo ${types[1]} no se encontro`})
            return
        }
        if (!order || !name || !types) {
            res.status(400).json({error: 'Todos los campos son obligatorios'})
            return;
        }

        if (!Array.isArray(types)) {
            res.status(400).json({error: "Types must be an array."});
            return;
        }


        const pokemon = await prisma.pokemon.create({
            data: {
                order,
                name,
                pokemon_types: {
                    create: [
                        {type: {connect: {id: firstType.id}}},
                        {type: {connect: {id: secondType.id}}}
                    ]
                }
            },
            include: {
                pokemon_types: true
            }
        });
        res.status(201).json(pokemon)


    } catch (error: any) {
        if (error?.code === 'P2002' && error?.meta?.target.includes('order')) {
            res.status(400).json({message: 'El order ingresado ya existe'})
        }
        console.log(error)
        res.status(500).json({error: 'Hubo un error en el registro'})
    }
}


export const updatePokemon = async (req: Request, res: Response) => {
    try {
        const {order, name} = req.body;
        const {id} = req.params;
        const pokemon = await prisma.pokemon.update({
            where:
                {
                    id: Number(id)
                },
            data: {
                order: order,
                name: name
            }
        })

        res.status(200).json(pokemon)
    } catch (e) {
        console.log(e)
    }
}


export const deletePokemon = async (req: Request, res: Response) => {
    try {
        const {id} = req.params

        const idPokemonTypes = await prisma.pokemon_types.findMany({
            where: {
                pokemon_id: Number(id)
            }
        })
        const ids = idPokemonTypes.map(items => items.id)
        console.log(ids)

        const deletepokemonTypes = await prisma.pokemon_types.deleteMany({
            where: {
                id: {
                    in: ids
                }
            },
        })
        const pokemon = await prisma.pokemon.delete({
            where: {
                id: Number(id)
            }
        })
        res.status(200).json({message: `El ${id} fue eliminado`})
    } catch (e) {
        console.log(e)
    }
}


export const getTypes = async (req: Request, res: Response) => {
    try {
        const types = await prisma.type.findMany()
        res.status(200).json(types)
    } catch (e) {
        console.log(e)
    }

}