import { Request, Response } from "express";
import { client } from "../../lib/configs/psqlDB";
import asyncHandler from "../../utils/asyncHandler";
import { CheckUserQuery } from "./user.type";
import { sendResponse } from "../../utils/responseHandler";
import { NotFoundError } from "../../lib/errors/CustomError";

export const checkUserExists = async (value: any, field: string = "email") => {
  const query = `SELECT * FROM users WHERE ${field}=($1) LIMIT 1`;
  const values = [value];

  const result = await client.query(query, values);

  return result.rows;
}

export const checkUser = asyncHandler(async (req: Request<{}, {}, {}, CheckUserQuery>, res: Response) => {
  const { email } = req.query;

  if (!email) {
    throw new NotFoundError('Email is required');
  }

  const result = await checkUserExists(email);

  if (result.length === 0) {
    throw new NotFoundError('User not found');
  }

  const respData = {
    id: result[0].id,
    name: result[0].name,
    email: result[0].email,
  }

  sendResponse(res, 200, 'User found', respData)
});