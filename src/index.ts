import dotenv from 'dotenv';
import app from './server';
dotenv.config();

app.listen(() => {
  console.log(`Server running on port: ${process.env.PORT}`);
});
