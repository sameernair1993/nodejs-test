import { config } from 'dotenv';
config();

export const configuration = {
  port: process.env.PORT,
  dbUsername: process.env.DATABASE_USERNAME,
  dbPassword: process.env.DATABASE_PASSWORD,
  dbHost: process.env.DATABASE_HOST
};
