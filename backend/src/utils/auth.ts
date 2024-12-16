import jwt, { SignOptions, JwtPayload as JWTDecodePayload, JsonWebTokenError } from 'jsonwebtoken';
import { User } from '../lib/global/types/user.type';
import { config } from '../lib/configs/envConfig';
import { domain, frontendDomain } from './constants';

const JWT_SECRET_KEY = config.auth.jwtSecret as string;

interface JwtPayload extends User {
  aud: string;
  iss: string;
}

export const generateAuthToken = async (user: User): Promise<string> => {
  const { email, role='admin' } = user;

  const payload: JwtPayload = {
    email,
    role,
    aud: frontendDomain,
    iss: domain,
  };

  const signOptions: SignOptions = {
    expiresIn: '1h',
  };

  const token = jwt.sign(payload, JWT_SECRET_KEY, signOptions);
  return token;
};

export const verifyAuthToken = async (token: string) => {
  try {

    const decoded = jwt.verify(token, JWT_SECRET_KEY) as JWTDecodePayload;
    const { exp } = decoded;

    const isSameDomain = (decoded.aud === frontendDomain && decoded.iss === domain);
    const isExpired = exp ? Date.now() > exp * 1000 : false;

    const isValid = isSameDomain && !isExpired;
    let message = 'Token is valid';

    if (!isSameDomain) {
      message = 'Domain is not matching';
    } else if (isExpired) {
      message = 'Token is expired';
    }    

    const resp = {
      isValid,
      message,
    };

    return resp;
  } catch (error) {
    let message;
    
    if (error instanceof JsonWebTokenError) {
      message = error.message;
    } else {
      message = 'Internal Server Error';
    }

    return {
      isValid: false,
      message,
    }
  }
};
