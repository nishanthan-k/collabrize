import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { InternalServerError, BadRequestError, UserAlreadyExistsError, ValidationError, NotFoundError, UnauthorizedError } from "../../lib/errors/CustomError";
import { decodePassword, hashPassword } from "../../lib/helpers/auth.helper";
import { client } from "../../lib/configs/psqlDB";
import { sendResponse } from "../../utils/responseHandler";
import { generateAuthToken } from "../../utils/auth";
import { loginSchema, signUpSchema } from "../../lib/global/schemas/auth.schema";
import { checkUserExists } from "../user/user.controller";

interface LoginReqBodyType {
  email: string,
  password: string,
}

interface SignupReqBodyType extends LoginReqBodyType {
  name: string,
  confirmPassword: string
}

export const loginUser = asyncHandler(async (req: Request<{}, {}, LoginReqBodyType, {}>, res: Response) => {
  const { email, password } = req.body;

  const obj = { email, password }
  
  const validation = loginSchema.safeParse(obj)

  if (!validation.success) {
    throw new ValidationError(validation.error.errors[0].message);
  }

  const result = await checkUserExists(email);
  
  if (result.length === 0) {
    throw new NotFoundError('User not found');
  }

  const user = result[0];

  const isValidPassword = decodePassword(password, user.password);

  if (!isValidPassword) {
    throw new UnauthorizedError('Invalid password');
  }

  const token = await generateAuthToken({ email });

  const respData = {
    authToken: token,
  }

  sendResponse(res, 200, 'Valid user', respData);
})

export const createUser = asyncHandler(async (req: Request<{}, {}, SignupReqBodyType, {}>, res: Response) => {
  const { name, email, password, confirmPassword } = req.body;

  const obj = { name, email, password, confirmPassword }
  
  const validation = signUpSchema.safeParse(obj)

  if (!validation.success) {
    throw new ValidationError(validation.error.errors[0].message);
  }

  const isUserExists = await checkUserExists(email);

  if (isUserExists.length > 0) {
    throw new UserAlreadyExistsError();
  }

  const hashedPassword = hashPassword(password);

  const q = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING id
  `;

  const values = [name, email, hashedPassword];

  const result = await client.query(q, values);

  if (result.rows.length === 0) {
    throw new InternalServerError('User creation failed');
  }

  const token = await generateAuthToken({ email })

  const repspData = {
    authToken: token,
  }

  sendResponse(res, 200, 'User created', repspData);
  
})
