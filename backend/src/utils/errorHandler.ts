import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../lib/errors/CustomError';
import { sendErrorResponse } from '../utils/responseHandler';

export const errorHandler = (
  err: Error | CustomError, 
  req: Request, 
  res: Response, 
  next: NextFunction
): void => {
  if (err instanceof CustomError) {
    return sendErrorResponse(res, err.statusCode, err.message, err.data);
  }

  console.error('Internal Server Error:', err.stack || err);
  return sendErrorResponse(res, 500, 'Something went wrong. Please try again later.');
};
