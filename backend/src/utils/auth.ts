import jwt, { SignOptions, JwtPayload as JWTDecodePayload, JsonWebTokenError } from 'jsonwebtoken';
import { User } from '../lib/global/types/user.type';
import { config } from '../lib/configs/envConfig';
import { domain, frontendDomain } from './constants';
import { userInfo } from 'os';

const JWT_SECRET_KEY = config.auth.jwtSecret as string;

interface JwtPayload extends User {
  aud: string;
  iss: string;
}

export const generateAuthToken = async (user: User): Promise<string> => {
  const { email, role = 'admin', id } = user;

  const payload: JwtPayload = {
    email,
    role,
    aud: frontendDomain,
    iss: domain,
    id,
  };

  const signOptions: SignOptions = {
    expiresIn: '1h',
  };

  const token = jwt.sign(payload, JWT_SECRET_KEY, signOptions);
  return token;
};

export const verifyAuthToken = async (token: string) => {
  try {

    const decoded = jwt.verify(token + '12', JWT_SECRET_KEY) as JWTDecodePayload;
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

    const userInfo = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    }

    const resp = {
      isValid,
      message,
      userInfo,
    };

    return resp;
  } catch (error) {
    let message;

    if (error instanceof JsonWebTokenError) {
      message = 'JWT - ' + error.message;
    } else {
      message = 'Internal Server Error';
    }

    return {
      isValid: false,
      message,
      userInfo: {},
    }
  }
};
