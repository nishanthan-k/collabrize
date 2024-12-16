import dotenv from 'dotenv';
import { ConfigType } from '../global/types/envConfig.type';

dotenv.config({ path: './.env.backend' });

export const config: ConfigType = {
  app: {
    port: process.env.PORT as string,
    environment: process.env.NODE_ENV || 'production'  as string,
    domain: process.env.NODE_ENV === 'development'
            ? process.env.DEV_DOMAIN  as string
            : process.env.PROD_DOMAIN  as string,
    frontendProdDomain: process.env.NODE_ENV === 'development'
            ? process.env.FRONTEND_DEV_DOMAIN  as string
            : process.env.FRONTEND_PROD_DOMAIN  as string,
    frontendDevDomain: process.env.NODE_ENV === 'development'
            ? process.env.FRONTEND_DEV_DOMAIN  as string
            : process.env.FRONTEND_DEV_DOMAIN  as string,
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET_KEY  as string,
  },
  db: {
    psql: process.env.POSTGRES_URL as string,
  }
}
