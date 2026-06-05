import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const db = new Pool({
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export default db;