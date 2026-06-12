import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma/client.js";

function signToken(user) {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
}

function normalizeNameInput({ first, last }) {
  return {
    first: typeof first === "string" ? first.trim() : "",
    last: typeof last === "string" ? last.trim() : "",
  };
}

export const registerUser = async (req, res) => {
  try {
    const { first, last, email, password } = req.body;

    const normalizedNames = normalizeNameInput({ first, last});

    if (
      !normalizedNames.first ||
      !normalizedNames.last ||
      !email ||
      !password
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required and must be valid" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Formato de correo invalido" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    const existingUser = await prisma.users.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "Ya existe un usuario con ese correo electrónico" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.users.create({
      data: {
        firstName: normalizedNames.first,
        lastName: normalizedNames.last,
        email: email,
        password: hashedPassword,
      },
    });

    const token = signToken(user);

    res.status(201).json({
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      message: "Cuenta creada exitosamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create user" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validate user

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await prisma.users.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = signToken(user.id);
    res.json({
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to login user" });
  }
};
