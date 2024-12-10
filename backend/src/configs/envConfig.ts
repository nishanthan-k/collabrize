import dotenv from 'dotenv';
import { isDev } from '../utils/constants';
import { ConfigType } from '../global/types/envConfig.type';

dotenv.config({ path: './.env.backend' });

export const config: ConfigType = {
  app: {
    port: process.env.PORT as string,
    environment: process.env.NODE_ENV || 'production'  as string,
    domain: process.env.NODE_ENV === 'development'
            ? process.env.DEV_DOMAIN  as string
            : process.env.PROD_DOMAIN  as string,
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET_KEY  as string,
  }
}
