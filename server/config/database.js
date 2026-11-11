export function resolveDatabaseConfig(env) {
  const environment = env.NODE_ENV?.trim().toLowerCase() || "development";
  if (!["development", "test", "production"].includes(environment)) {
    throw new Error("NODE_ENV must be development, test, or production");
  }
  const target = environment === "production" ? "cloud" : "local";

  const url = target === "cloud"
    ? env.CLOUD_DATABASE_URL?.trim()
    : env.DATABASE_URL?.trim();

  if (!url) {
    throw new Error(target === "cloud"
      ? "Set CLOUD_DATABASE_URL for the production database"
      : "Set DATABASE_URL for the development database");
  }

  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error("The selected database URL must be a valid PostgreSQL URL");
  }
  if (!["postgres:", "postgresql:"].includes(parsed.protocol)) {
    throw new Error("The selected database URL must use postgres:// or postgresql://");
  }

  return { target, url };
}
