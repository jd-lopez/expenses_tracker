import assert from "node:assert/strict";
import { test } from "node:test";
import { resolveDatabaseConfig } from "./database.js";

const local = "postgresql://user:password@localhost:5432/expenses_tracker";
const cloud = "postgresql://user:password@cloud.example:5432/expenses_tracker?sslmode=require";

test("existing DATABASE_URL remains supported", () => {
  assert.deepEqual(resolveDatabaseConfig({ DATABASE_URL: local }), { target: "local", url: local });
});

test("development automatically selects the local URL", () => {
  assert.equal(resolveDatabaseConfig({ NODE_ENV: "development", DATABASE_URL: local, CLOUD_DATABASE_URL: cloud }).url, local);
});

test("cloud mode selects the cloud URL and preserves provider SSL parameters", () => {
  assert.deepEqual(resolveDatabaseConfig({ NODE_ENV: "production", DATABASE_URL: local, CLOUD_DATABASE_URL: cloud }), { target: "cloud", url: cloud });
});

test("missing cloud configuration never silently falls back to the local database", () => {
  assert.throws(() => resolveDatabaseConfig({ NODE_ENV: "production", DATABASE_URL: local }), /Set CLOUD_DATABASE_URL/);
});

test("invalid targets, missing URLs, and invalid URLs fail without leaking credentials", () => {
  for (const env of [{ NODE_ENV: "invalid" }, {}, { DATABASE_URL: "secret-invalid-url" }, { DATABASE_URL: "https://example.com" }]) {
    assert.throws(() => resolveDatabaseConfig(env), (error) => !error.message.includes("secret-invalid-url"));
  }
});

test("the test environment uses the development URL", () => {
  assert.equal(resolveDatabaseConfig({ NODE_ENV: "test", DATABASE_URL: local }).url, local);
});

test("obsolete manual switches cannot override production", () => {
  assert.equal(resolveDatabaseConfig({ NODE_ENV: "production", DATABASE_TARGET: "local", DATABASE_URL: local, CLOUD_DATABASE_URL: cloud }).url, cloud);
});
