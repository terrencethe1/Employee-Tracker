import { Pool } from "pg";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432", 10),
});

const executeSqlFile = async (filePath: string) => {
  const sql = fs.readFileSync(filePath, "utf-8");
  await pool.query(sql);
};

const setupDatabase = async () => {
  try {
    console.log("Running schema.sql...");
    await executeSqlFile(path.join(__dirname, "../sql/schema.sql"));

    console.log("Running seed.sql...");
    await executeSqlFile(path.join(__dirname, "../sql/seed.sql"));

    console.log("Database setup complete!");
  } catch (error) {
    console.error("Error setting up the database:", error);
  } finally {
    await pool.end();
  }
};

setupDatabase();
