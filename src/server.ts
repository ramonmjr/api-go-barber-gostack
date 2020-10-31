import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import uploadconfig from './config/upload';
import routes from './routes/index.routes';

import AppError from './errors/AppError';

import './database';
const app = express()

app.use(express.json());
app.use('/files', express.static(uploadconfig.directory));

app.use(routes);

app.use((error: Error, request: Request, response: Response, _: NextFunction) => {
  if (error instanceof AppError) {
    response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  console.error(error);

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});
app.listen(3333, () => {
  console.log('Server started on port 3333!');
});
