import { Request, Response, NextFunction, RequestHandler } from "express";
import { RequestFunctionType } from "../lib/global/types/global.type";

const asyncHandler = (fn: RequestFunctionType): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncHandler;
