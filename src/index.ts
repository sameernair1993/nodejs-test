import { bootstrap } from './server';

bootstrap()
  .then(() => {
    console.log('Server running');
  })
  .catch((error) => {
    console.log('Error starting server: ', error);
  })
