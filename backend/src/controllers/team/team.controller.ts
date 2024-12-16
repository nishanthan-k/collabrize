import { z } from "zod";
import asyncHandler from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/responseHandler";
import { Request, Response } from "express";
import { createTeamSchema } from "./team.schema";
import { ValidationError } from "../../lib/errors/CustomError";
import { checkUserExists } from "../user/user.controller";

type CreateRequestBody = z.infer<typeof createTeamSchema>

export const createTeam = asyncHandler(async (req: Request<{}, {}, CreateRequestBody, {}>, res: Response) => {
  const { userId, teamName, teamMembers } = req.body;

  const reqBody = {
    userId,
    teamName,
    teamMembers,
  }

  const schemaValidation = createTeamSchema.safeParse(reqBody);
  console.log(schemaValidation.error?.errors)

  if (!schemaValidation.success) {
    throw new ValidationError(schemaValidation.error.errors[0].message);
  }

  const validTeamMembers = await Promise.all(
    teamMembers.map(async (member) => {
      const res = await checkUserExists(member, "id");
      return res.length > 0;
    })
  );

  if (!validTeamMembers.every((member) => member)) {
    throw new ValidationError("Invalid team members");
  }

  sendResponse(res, 200, "OK");
})