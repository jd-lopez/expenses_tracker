import express from "express";
import cors from "cors";
import helmet from "helmet";
import expressRateLimit from "express-rate-limit";
import dotenv from "dotenv";

const app = express();
const PORT = 3000;

dotenv.config();
app.use(cors());

import { registerUser, loginUser } from "./controllers/authController.js";

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
app.post("/register", registerUser);
app.post("/login", loginUser);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
