import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
import { resolveDatabaseConfig } from "./database.js";

// Resolve relative to this module so the working directory cannot select another .env.
// Environment variables supplied by the hosting platform take precedence.
dotenv.config({ path: fileURLToPath(new URL("../.env", import.meta.url)), quiet: true });

export const databaseConfig = resolveDatabaseConfig(process.env);
