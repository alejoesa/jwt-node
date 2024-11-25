import { Request, Response } from "express";
import prisma from '../models/pokemon';
import {type} from "node:os";


export const getById= async (req: Request, res: Response) => {

}


export const getAllPokemon= async (req: Request, res: Response) => {

}


export const createPokemon= async (req: Request, res: Response): Promise<void> => {
    try {
        const {order, name, types} = req.body;
        console.log(types)
        if (!order || !name || !types){
            res.status(400).json({error: 'Todos los campos son obligatorios'})
            return;
        }

        if (!Array.isArray(types)) {
             res.status(400).json({ error: "Types must be an array." });
             return;
        }

        



        /*const [firstType, secondType] = types;

    const pokemon = await prisma.pokemon.create({
        data: {
            order: 1,
            name: "bulbasaur",
            types: {
                connectOrCreate: [
                    {
                        where: { name: "grass" },  // Conectar o crear el tipo "grass"
                        create: { name: "grass" }, // Si no existe, crea el tipo "grass"
                    },
                    {
                        where: { name: "poison" },  // Conectar o crear el tipo "poison"
                        create: { name: "poison" }, // Si no existe, crea el tipo "poison"
                    },
                ],
            },
        },
    });

        console.log(typeof firstType)
        console.log(secondType)*/


}


export const updatePokemon= async (req: Request, res: Response) => {

}


export const deletePokemon= async (req: Request, res: Response) => {

}

