import { Request, Response, NextFunction } from 'express';

// Generic type for the request function
export type RequestFunctionType<
  P = {}, // Params
  Q = {}, // Query
  B = {}  // Body
> = (
  req: Request<P, {}, B, Q>, // Request with the generic types
  res: Response,
  next: NextFunction
) => Promise<void>;
