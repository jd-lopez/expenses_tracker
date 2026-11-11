import express from "express";
import cors from "cors";
import helmet from "helmet";
import expressRateLimit from "express-rate-limit";
import { databaseConfig } from "./config/env.js";
import {
  registerUser,
  loginUser,
  getCurrentUser,
} from "./controllers/authController.js";
import { authMiddleware } from "./middleware/auth.js";
import {
  getAllTransactions,
  getTransactionHistory,
  createTransaction,
  deleteTransaction,
} from "./controllers/transactionController.js";
import {
  getAccounts,
  createAccount,
  deleteAccount,
} from "./controllers/accountController.js";

import {
  getCategories,
  createCategory,
} from "./controllers/categoryController.js";

const app = express();
const PORT = Number(process.env.PORT || 3000);
if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
  throw new Error("PORT must be an integer between 1 and 65535");
}

const clientUrl = process.env.CLIENT_URL?.replace(/\/$/, "");

app.use(
  cors({
    origin: clientUrl,
    credentials: false,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Middleware to set security-related HTTP headers
app.use(helmet());

// Middleware to limit repeated requests to public APIs and/or endpoints
const limiter = expressRateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded data (for form submissions)
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/about", (req, res) => {
  res.send("This is the about page!");
});
app.get("/accounts", authMiddleware, getAccounts);
app.get("/transactions", authMiddleware, getAllTransactions);
app.get("/transactions/history", authMiddleware, getTransactionHistory);
app.post("/register", registerUser);
app.post("/login", loginUser);
app.get("/me", authMiddleware, getCurrentUser);
app.post("/accounts", authMiddleware, createAccount);
app.post("/transactions", authMiddleware, createTransaction);
app.get("/categories", authMiddleware, getCategories);
app.post("/categories", authMiddleware, createCategory);
app.delete("/transactions/:id", authMiddleware, deleteTransaction);
app.delete("/accounts/:id", authMiddleware, deleteAccount);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Database target: ${databaseConfig.target}`);
});
