import jwt, { SignOptions, JwtPayload as JWTDecodePayload } from 'jsonwebtoken';
import { User } from '../global/types/user.type';
import { config } from '../configs/envConfig';

const JWT_SECRET_KEY = config.auth.jwtSecret as string;

// Define JWT options (signing options)
const signOptions: SignOptions = {
  expiresIn: '1h',  // Set expiration time to 1 hour
};

// Define JwtPayload type to include email, role, aud, and iss
interface JwtPayload extends User {
  aud: string;
  iss: string;
}

export const generateAuthToken = (user: User): string => {
  const { email, role } = user;

  const isDev = config.app.environment === 'development';
  const payload: JwtPayload = {
    email,
    role,
    aud: isDev ? 'http://localhost:5173' : 'https://collabrize.vercel.app',
    iss: isDev ? 'http://localhost:5173' : 'https://collabrize.vercel.app',
  };

  const token = jwt.sign(payload, JWT_SECRET_KEY, signOptions);
  return token;
};

// Verify and decode token
export const verifyAuthToken = (token: string): boolean => {
  try {
    // Decode the token
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as JWTDecodePayload;

    // Check if the audience and issuer match expected values
    const isValid =
      decoded.aud === (config.app.environment === 'development' ? 'http://localhost:5173' : 'https://collabrize.vercel.app') &&
      decoded.iss === (config.app.environment === 'development' ? 'http://localhost:5173' : 'https://collabrize.vercel.app');

    return isValid;
  } catch (error) {
    console.error('Invalid token:', error);
    return false;
  }
};
