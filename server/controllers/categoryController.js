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

  return res.status(200).json(category);
};

export const createCategory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, categoryType } = req.body;

    console.log(name);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!userId || !name || !categoryType) {
      return res.status(400).json({ message: "Category required" });
    }

    const uppertype = categoryType.toUpperCase();
    console.log(uppertype);
    const category = await prisma.category.create({
      data: {
        userId,
        name,
        categoryType: uppertype,
      },
    });

    console.log(typeof initialBalance);

    return res.status(201).json(category);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
