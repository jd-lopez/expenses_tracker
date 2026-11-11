// Select production before the application and its database config load.
process.env.NODE_ENV = "production";
await import("./main.js");
