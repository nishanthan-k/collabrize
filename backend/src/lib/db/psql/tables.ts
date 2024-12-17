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

export const orgTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS organizations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      owner_id INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

      CONSTRAINT fk_owner FOREIGN KEY (owner_id)
      REFERENCES users(id) 
      ON DELETE SET NULL
    );
  `;

  await client.query(query);
};

export const teamTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS Teams (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      owner_id INT NOT NULL,
      members JSONB NOT NULL DEFAULT '[]',
      org_id INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

      CONSTRAINT fk_owner FOREIGN KEY (owner_id)
      REFERENCES employees(id) 
      ON DELETE CASCADE,

      CONSTRAINT fk_org FOREIGN KEY (org_id)
      REFERENCES organizations(id)
      ON DELETE CASCADE
    );
  `;

  await client.query(query);
};


export const employeeTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS employees (
      id SERIAL PRIMARY KEY,
      email VARCHAR(50) NOT NULL,
      name VARCHAR(50) NOT NULL,
      role VARCHAR(50) NOT NULL,
      designation VARCHAR(50) NOT NULL,
      experience INTEGER NOT NULL CHECK (experience >= 0),
      date_of_joining DATE NOT NULL,
      date_of_birth DATE NOT NULL,
      last_working_day DATE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      user_id INT,
      org_id INT,

      CONSTRAINT fk_user FOREIGN KEY (user_id)
      REFERENCES users(id)
      ON DELETE CASCADE, -- Delete employee if the user is removed

      CONSTRAINT fk_org FOREIGN KEY (org_id)
      REFERENCES organizations(id)
      ON DELETE CASCADE -- Delete employee if the organization is removed
    );
  `;

  await client.query(query);
};

