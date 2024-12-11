import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { InternalServerError, BadRequestError, UserAlreadyExistsError, ValidationError, NotFoundError, UnauthorizedError } from "../../errors/CustomError";
import { decodePassword, hashPassword } from "../../helpers/auth.helper";
import { client } from "../../configs/psqlDB";
import { sendResponse } from "../../utils/responseHandler";
import { generateAuthToken } from "../../utils/auth";

interface LoginReqBodyType {
  email: string,
  password: string,
}

interface SignupReqBodyType extends LoginReqBodyType {
  confirmPassword: string
}

const checkUserExists = async (email: string) => {
  const query = `SELECT * FROM users WHERE email=($1) LIMIT 1`;
  const values = [email];

  const result = await client.query(query, values);

  return result.rows;
}

export const loginUser = asyncHandler(async (req: Request<{}, {}, LoginReqBodyType, {}>, res: Response) => {
  const { email, password } = req.body;

  if (!email) {
    throw new BadRequestError('Email not found');
  }

  if (!password) {
    throw new BadRequestError('Password not found');
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
  const { email, password, confirmPassword } = req.body;

  if (!email) {
    throw new BadRequestError('Email not found');
  }

  if (!password) {
    throw new BadRequestError('Password not found');
  }

  if (!confirmPassword) {
    throw new BadRequestError('Confirm Password not found');
  }

  if (password !== confirmPassword) {
    throw new BadRequestError('Passwords are not matching');
  }

  const isUserExists = await checkUserExists(email);

  if (isUserExists.length > 0) {
    throw new UserAlreadyExistsError();
  }

  const hashedPassword = hashPassword(password);

  const q = `
    INSERT INTO users (email, password)
    VALUES ($1, $2)
    RETURNING id
  `;

  const values = [email, hashedPassword];

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
