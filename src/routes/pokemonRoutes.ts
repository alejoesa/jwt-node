import express from 'express';
import { authenticateToken } from '../utils/auth.service';
import {
  createPokemon,
  deletePokemon,
  getAllPokemon,
  getByOrder,
  getTypes,
  updatePokemon,
} from '../controllers/pokemonController';

const router = express.Router();



// Rutas
router.get('/', getAllPokemon); //--> Listar todos los pokemones
router.get('/types', getTypes); //--> Listar todos los types
router.get('/:order', getByOrder); // --> Listar un pokemon en expecifico
router.post('/', createPokemon); // --> Crear un pokemon
router.put('/:orderId', updatePokemon); // --> Actualizar algun campo de un pokemon
router.delete('/:order', deletePokemon); // --> Eliminar un pokemon


export default router;
