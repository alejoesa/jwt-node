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

//Pasar el middleware por todas las rutas
router.use(authenticateToken);

// Rutas
router.get('/', getAllPokemon); //--> Listar todos los pokemones
router.get('/:order', getByOrder); // --> Listar un pokemon en expecifico
router.post('/', createPokemon); // --> Crear un pokemon
router.put('/:orderId', updatePokemon); // --> Actualizar algun campo de un pokemon
router.delete('/:order', deletePokemon); // --> Eliminar un pokemon
router.get('/types', getTypes); //--> Listar todos los types

export default router;
