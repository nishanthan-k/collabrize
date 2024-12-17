import { Request, Response } from "express";
import { client } from "../../lib/configs/psqlDB";
import { ValidationError } from "../../lib/errors/CustomError";
import { orgExists } from "../../lib/helpers/db.helper";
import asyncHandler from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/responseHandler";
import { createOrgSchema } from "./org.schema";
import { CreateOrgRequestBody } from "./org.type";

export const checkOrgExists = async (value: any, field: string = "id") => {
  const q = `SELECT * FROM organizations WHERE ${field} = $1`;
  const values = [value];

  const result = await client.query(q, values);

  return result.rows;
}

export const createOrganization = asyncHandler(async (req: Request<{}, {}, CreateOrgRequestBody, {}>, res: Response) => {
  let { id, orgName } = req.body;
  orgName = orgName?.trim();

  const validation = createOrgSchema.safeParse({ id, orgName });

  if (!validation.success) {
    throw new ValidationError(validation.error.errors[0].message);
  }  

  const isOrgExists = await orgExists('name', orgName);

  if (isOrgExists) {
    throw new ValidationError('Organization already exists');
  }

  const query = `
    INSERT INTO organizations (name, owner_id)
    VALUES ($1, $2)
    RETURNING id
  `;

  const values = [orgName, id];

  const result = await client.query(query, values);

  if (result.rows.length === 0) {
    throw new Error('Organization creation failed');
  }

  const respData = result.rows

  sendResponse(res, 200, 'Organization created', respData);
})