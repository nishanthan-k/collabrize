import { Request, Response, NextFunction, RequestHandler } from "express";
import { RequestFunctionType } from "../lib/global/types/global.type"; // Adjust path as needed

// asyncHandler with generics for params, query, and body
const asyncHandler = <P, Q, B>(
  fn: RequestFunctionType<P, Q, B> // Use the RequestFunctionType
): RequestHandler<P, {}, B, Q> => {  // Ensure compatibility with RequestHandler
  return (req: Request<P, {}, B, Q>, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncHandler;
