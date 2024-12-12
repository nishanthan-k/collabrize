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


export const employeeTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS employees (
      id SERIAL PRIMARY KEY,
      email VARCHAR(50) NOT NULL,
      name VARCHAR(50) NOT NULL,
      role VARCHAR(50) NOT NULL,
      designation VARCHAR(50) NOT NULL,
      experience INTEGER NOT NULL,
      date_of_joining DATE NOT NULL,
      date_of_birth DATE NOT NULL,
      password VARCHAR(50) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      user_id INT,

      CONSTRAINT fk_userId FOREIGN KEY (user_id)
      REFERENCES users(id)
    );

    CREATE OR REPLACE FUNCTION set_updated_at()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = CURRENT_TIMESTAMP;
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    CREATE TRIGGER trigger_set_updated_at
    BEFORE UPDATE ON employees
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();
  `;

  await client.query(query);
};
