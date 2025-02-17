import dotenv from 'dotenv';
import express from 'express';
import authRoutes from './routes/authroutes';
import pokemonRoutes from './routes/pokemonRoutes';
dotenv.config();

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Or specify your frontend's URL
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

console.log('Ejecutando ando');

export default app;
//routes
app.use('/auth', authRoutes);
app.use('/pokemon', pokemonRoutes);
//auth
//user