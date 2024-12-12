import { Request, Response, NextFunction } from "express";

export type RequestFunctionType = (req: Request, res: Response, next: NextFunction) => Promise<any>;
