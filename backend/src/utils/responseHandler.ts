import { Response } from 'express';


interface ResponseType {
  success: boolean,
  message: string,
  data?: null | object,
  meta?: null | object,
}

export const sendResponse = (
  res: Response, 
  statusCode: number, 
  message: string, 
  data: any = null, 
  meta: any = null
): void => {
  const response: ResponseType = {
    success: true,
    message,
  };

  if (data) {
    response.data = data
  }

  if (meta) {
    response.meta = meta
  }

  res.status(statusCode).json(response);
};

export const sendErrorResponse = (
  res: Response, 
  statusCode: number, 
  message: string, 
  data: any = null
): void => {
  const response: ResponseType = {
    success: false,
    message,
  };

  if (data) {
    response.data = data
  }

  res.status(statusCode).json(response);
};
