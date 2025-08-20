import 'reflect-metadata';
import cors from 'cors';
import express, { json, Request, Response } from 'express';
import morgan from 'morgan';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { envs } from './config/envs';
import Database from './database/connect';
import AppRoutes from './routes/routes';

const app = express();

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API with Swagger',
      version: '1.0.0',
      description: 'A simple API documented with Swagger',
    },
  },
  apis: ['./src/routes/*.ts'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const start = async () => {
  const isInitialized = await Database.connect();
  if (!isInitialized) {
    console.error('Server startup aborted: failed to connect to database.');
    process.exit(1); // Optional: stop the process if DB fails
    return;
  }

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.use(json());
  app.use(cors());
  app.use(morgan('tiny'));

  app.use(AppRoutes.routes);

  app.listen(envs.port, () => {
    console.log(`server is running on port ${envs.port}`);
    console.log(`Swagger docs available at http://localhost:${envs.port}/api-docs`);
  });
};

start();
