import jwt from 'jsonwebtoken';
import { User } from '../global/types/user.type';
import { config } from '../configs/envConfig';

const JWT_SECRET_KEY = config.auth.jwtSecret;
console.log('config', config)
console.log('JWT_SECRET_KEY', JWT_SECRET_KEY)
export const generateAuthToken = (user: User) => {
  const { email, role } = user;
  const token = jwt.sign({ email, role }, JWT_SECRET_KEY, { expiresIn: '1h' });
  return token;
}

const verifyAuthToken = (token: string) => {
  const isValid = jwt.verify(token, JWT_SECRET_KEY);
  return isValid;
}
