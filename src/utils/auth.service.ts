import { User } from '../models/user.interface';
import jwt from 'jsonwebtoken';
import express, { NextFunction, Request, Response } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'Default-secret';

export const generateToken = (user: User): string => {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: '1h',
  });
};

//Middleware de jwt para ver si estamos autenticados
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    res.status(401).json({ Error: 'No autorizado' });
    return;
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Error en la autoticacion: ', err);
      console.log(token);
      return res.status(403).json({ Error: 'No tiene acceso a este recurso' });
    }

    next();
  });
};
