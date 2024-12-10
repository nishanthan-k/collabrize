import { client } from "../../configs/psqlDB";

export const userTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(50) NOT NULL,
      password VARCHAR(50) NOT NULL
    )
  `;

  await client.query(query);
}


export const employeeTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email VARCHAR(50) NOT NULL,
      name VARCHAR(50) NOT NULL,
      role VARCHAR(50) NOT NULL,
      designation VARCHAR(50) NOT NULL,
      experience INTEGER NOT NULL,
      data_of_joining DATE NOT NULL,
      data_of_birth DATE NOT NULL,
      password VARCHAR(50) NOT NULL,
      created_at DATETIME NOT NULL,
      updated_at DATETIME NOT NULL
    )
  `;  
}