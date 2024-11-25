import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {createPokemon} from "../controllers/pokemonController";

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret'

//Middleware de jwt para ver si estamos autenticados
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) {
      res.status(401).json({ Error: 'No autorizado' })
      return
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Error en la autoticacion: ', err)
      return res.status(403).json({ Error: 'No tiene acceso a este recurso' })
    }
    
    next()
  })
}


router.post('/', authenticateToken, createPokemon);
/*router.post('/', authenticateToken, (req: Request, res: Response) => {
    res.send('POST request to the homepage');
});
router.put('/', authenticateToken, (req: Request, res: Response) => {
    res.send('PUT request to the homepage');
});
router.delete('/', authenticateToken, (req: Request, res: Response) => {
    res.send('DELETE request to the homepage');
});*/

export default router;