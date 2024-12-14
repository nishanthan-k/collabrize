import { client } from "../../lib/configs/psqlDB";

export const checkUserExists = async (email: string) => {
  const query = `SELECT * FROM users WHERE email=($1) LIMIT 1`;
  const values = [email];

  const result = await client.query(query, values);

  return result.rows;
}