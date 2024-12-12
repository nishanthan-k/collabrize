import { Client } from "pg";
import { config } from "./envConfig";

const DATABASE_URL = config.db.psql;

const client = new Client({
  connectionString: DATABASE_URL,
});

const connectDB = async () => {
  try {
    console.log('Trying to connect Postgres');
    await client.connect();
  } catch (error) {
    console.log('DB Connection Error', error);
    process.exit(1);
  }
}

const disConnectDB = async () => {
  try {
    console.log('Trying to disconnect Postgres');
    await client.end();
  } catch (error) {
    console.log('DB Disconnection Error', error);
  }
}

export { client, connectDB, disConnectDB };