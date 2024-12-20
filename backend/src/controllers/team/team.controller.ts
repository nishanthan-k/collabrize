import { z } from "zod";
import asyncHandler from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/responseHandler";
import { Request, Response } from "express";
import { createTeamSchema } from "./team.schema";
import { ValidationError } from "../../lib/errors/CustomError";
import { checkUserExists } from "../user/user.controller";
import { client } from "../../lib/configs/psqlDB";
import { checkOrgExists } from "../org/org.controller";

type CreateRequestBody = z.infer<typeof createTeamSchema>

export const createTeam = asyncHandler(async (req: Request<{}, {}, CreateRequestBody, {}>, res: Response) => {
  const { userId, teamName, teamMembers, orgId } = req.body;

  const reqBody = {
    userId,
    teamName,
    teamMembers,
    orgId,
  }

  const schemaValidation = createTeamSchema.safeParse(reqBody);

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

  const validOrg = await checkOrgExists(orgId, "id");

  if (validOrg.length === 0) {
    throw new ValidationError("Invalid organization");
  }
  
  const query = `
    INSERT INTO teams (name, owner_id, members, org_id)
    VALUES ($1, $2, $3, $4)
    RETURNING id
  `;

  const values = [teamName, userId, JSON.stringify(teamMembers), orgId];

  const result = await client.query(query, values);

  if (result.rows.length === 0) {
    throw new Error('Team creation failed');
  }

  const respData = result.rows

  sendResponse(res, 200, 'Team created', respData);
  // sendResponse(res, 200, 'OK');
})