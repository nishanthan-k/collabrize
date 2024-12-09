import dotenv from 'dotenv';

dotenv.config({ path: './.env.backend' });

console.log(process.env.NODE_ENV, process.env.PORT)

export const config = {
  app: {
    port: process.env.PORT,
    environment: process.env.NODE_ENV,
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET_KEY,
  }
}
