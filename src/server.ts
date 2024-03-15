import express, { type Express } from 'express';
import router from './router';
import { connectToDatabase, synchronize } from './database';
import { configuration } from './config';

const app: Express = express();

export const setupRouter = () => {
  // mount routes
  app.use('/api', router);
}

const startServer = () => {
  app.listen(configuration.port, () => {
    console.log(`Server running on port: ${configuration.port}`);
  });
}

export const getExpressApp = () => app;

export const bootstrap = async () => {
  await connectToDatabase();
  await synchronize();
  setupRouter();
  startServer();
}
