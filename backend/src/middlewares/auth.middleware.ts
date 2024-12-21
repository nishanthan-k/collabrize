import { JwtError, NotFoundError, ValidationError } from "../lib/errors/CustomError";
import asyncHandler from "../utils/asyncHandler";
import { verifyAuthToken } from "../utils/auth";

const validateToken = asyncHandler(async (req, res, next) => {
  const token = req?.headers?.authorization?.split(" ")[1];

  if (!token) {
    return next(new NotFoundError('Auth token not found'))
  }

  const tokenResp = await (verifyAuthToken(token));

  if (!tokenResp.isValid) {
    return next(new JwtError(tokenResp.message))
  }

  next();
})

export default {
  validateToken,
};
