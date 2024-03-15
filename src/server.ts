import express, { type Express } from 'express';
import router from './router';
import { connectToDatabase, synchronize } from './database';
import { configuration } from './config';
import { errorHandler } from './middlewares/error-handler.middleware';

const app: Express = express();

app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));

app.use(errorHandler);

app.use('/api', router);

const startServer = () => {
  app.listen(configuration.port, () => {
    console.log(`Server running on port: ${configuration.port}`);
  });
}

export const bootstrap = async () => {
  await connectToDatabase();
  await synchronize();
  startServer();
}

export const getExpressApp = () => app;
