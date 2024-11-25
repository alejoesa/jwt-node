import dotenv from 'dotenv';
import express from 'express';
import authRoutes from './routes/authroutes'
import pokemonRoutes from './routes/pokemonRoutes';
dotenv.config();

const app = express();

app.use(express.json());

console.log("Ejecutando ando")


export default app
//routes
app.use('/auth', authRoutes)
app.use('/pokemon', pokemonRoutes)
//auth
//user
