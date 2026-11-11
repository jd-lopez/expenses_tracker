// prisma/client.js
import { databaseConfig } from "../config/env.js";
import { PrismaClient } from "../generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: databaseConfig.url,
});
export const prisma = new PrismaClient({ adapter });
