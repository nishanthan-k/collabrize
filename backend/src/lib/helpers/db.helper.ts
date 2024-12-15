import { client } from "../configs/psqlDB";

export const orgExists = async (field: string, value: any): Promise<number> => {
  let q = `SELECT id FROM organizations WHERE ${field} = $1`;

  const values = [value];

  const result = await client.query(q, values);

  const orgId = result?.rows[0]?.id || null; 

  return orgId; 
}