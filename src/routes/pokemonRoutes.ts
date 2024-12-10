import express, {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {
    createPokemon,
    deletePokemon,
    getAllPokemon,
    getById,
    getTypes,
    updatePokemon
} from "../controllers/pokemonController";

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret'

//Middleware de jwt para ver si estamos autenticados
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        res.status(401).json({Error: 'No autorizado'})
        return
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('Error en la autoticacion: ', err)
            console.log(token)
            return res.status(403).json({Error: 'No tiene acceso a este recurso'})
        }

        next()
    })
}
router.get('/', authenticateToken, getAllPokemon); //--> Listar todos los pokemones
router.get('/types', authenticateToken, getTypes); //--> Listar todos los types
router.get('/:id', authenticateToken, getById); // --> Listar un pokemon en expecifico
router.post('/', authenticateToken, createPokemon); // --> Crear un pokemon
router.put('/:id', authenticateToken, updatePokemon); // --> Actualizar algun campo de un pokemon
router.delete('/:id', authenticateToken, deletePokemon); // --> Eliminar un pokemon


/*router.put('/', authenticateToken, (req: Request, res: Response) => {
    res.send('PUT request to the homepage');
});
router.delete('/', authenticateToken, (req: Request, res: Response) => {
    res.send('DELETE request to the homepage');
});*/

export default router;

