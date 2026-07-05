import { prisma } from "../prisma/client.js";

export const getCategories = async (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const categories = await prisma.category.findMany({
    where: {
      userId,
    },
  });

  return res.status(200).json(categories);
};

export const createCategory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, type, icon } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!name || !type) {
      return res.status(400).json({ message: "name and type are required" });
    }

    const uppertype = type.toUpperCase();

    if (!["INCOME", "EXPENSE"].includes(uppertype)) {
      return res.status(400).json({ message: "type must be INCOME or EXPENSE" });
    }

    const category = await prisma.category.create({
      data: {
        userId,
        name,
        icon: icon || null,
        type: uppertype,
      },
    });

    return res.status(201).json(category);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
