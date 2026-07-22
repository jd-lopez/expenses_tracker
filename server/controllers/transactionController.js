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
    const {
      title,
      description,
      amount,
      type,
      accountId,
      categoryId,
      transactionDate,
    } = req.body;

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
        transactionDate: transactionDate
          ? new Date(transactionDate)
          : undefined,
      },
    });

    res.status(201).json(transaction);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const userId = req.user.id;
    let { id } = req.params;
    let transId = Number(id);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const transToDelete = await prisma.transaction.findUnique({
      where: {
        id: transId,
      },
      include: { account: true },
    });
    if (transToDelete.account.userId !== userId) {
      console.log(deletedTrans.accountId.userId);
      return res.status(403).json({ message: "Forbidden" });
    }

    const deletedTrans = await prisma.transaction.delete({
      where: {
        id: transId,
      },
    });

    if (!deletedTrans) {
      return res.status(404).json({ message: "Not found" });
    }

    return res
      .status(201)
      .json({ message: "Transaction deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
