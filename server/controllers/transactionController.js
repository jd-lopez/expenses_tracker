import { prisma } from "../prisma/client.js";

export const getAllTransactions = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const transactions = await prisma.transaction.findMany({
      where: {
        account: { userId },
      },
    });
    return res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const createTransaction = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, amount, type, accountId, categoryId } =
      req.body;

    console.log(typeof amount);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!title || !amount || !type || !accountId) {
      return res
        .status(400)
        .json({ message: "title, amount, type, and accountId are required" });
    }

    const validTypes = ["INCOME", "EXPENSE", "TRANSFER"];
    if (!validTypes.includes(type)) {
      return res
        .status(400)
        .json({ message: "type must be one of: INCOME, EXPENSE, TRANSFER" });
    }

    const transaction = await prisma.transaction.create({
      data: {
        title,
        description,
        amount,
        type,
        accountId,
        categoryId: categoryId || null,
      },
    });

    res.status(201).json(transaction);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
