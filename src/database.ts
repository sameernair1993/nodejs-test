import { Sequelize } from 'sequelize';
import { configuration } from './config';

const sequelize = new Sequelize('post', `${configuration.dbUsername}`, `${configuration.dbPassword}`, {
  host: configuration.dbHost,
  dialect: 'mysql'
});
export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to database');
  } catch (error) {
    console.log('Error connecting to database: ', error);
  }
};

export const synchronize = async () => {
  try {
    await sequelize.sync();
    console.log('Synced');
  } catch (error) {
    console.log('Error synchronizing: ', error);
  }
}
