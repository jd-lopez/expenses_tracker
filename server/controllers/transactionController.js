import { prisma } from "../prisma/client.js";

function parseDateOnly(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null;
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isNaN(date.getTime()) ||
    date.toISOString().slice(0, 10) !== value
    ? null
    : date;
}

export const getAllTransactions = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);
    const search = String(req.query.search || "").trim();

    const skip = (page - 1) * limit;

    const where = {
      account: {
        userId,
      },
      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
          {
            account: {
              userId,
              name: { contains: search, mode: "insensitive" },
            },
          },
        ],
      }),
    };

    const [transactions, total] = await prisma.$transaction([
      prisma.transaction.findMany({
        where,
        skip,
        take: limit,
        orderBy: [
          {
            transactionDate: "desc",
          },
          { createdAt: "desc" },
        ],

        include: {
          account: true,
          categories: true,
        },
      }),

      prisma.transaction.count({
        where,
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return res.status(200).json({
      transactions,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getTransactionHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const transactions = await prisma.transaction.findMany({
      where: { account: { userId } },
      orderBy: [{ transactionDate: "desc" }, { createdAt: "desc" }],
    });

    return res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

// Accept the database client explicitly so validation can be tested without a database.
export function createTransactionHandler(db) {
  return async (req, res) => {
    try {
      const userId = req.user.id;
      const {
        title,
        description,
        amount,
        type,
        payMethod,
        accountId,
        destinationAccountId,
        categoryId,
        transactionDate,
      } = req.body;

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const parsedAccountId = Number(accountId);
      const parsedAmount = Number(amount);
      const parsedCategoryId =
        categoryId == null || categoryId === "" ? null : Number(categoryId);
      const parsedDestinationId =
        destinationAccountId == null || destinationAccountId === ""
          ? null
          : Number(destinationAccountId);
      const validTypes = [
        "INCOME",
        "EXPENSE",
        "INTERNAL_TRANSFER",
        "EXTERNAL_TRANSFER",
      ];
      const validMethods = ["DEBIT_CARD", "BANK_TRANSFER", "CASH", "ATM"];

      if (
        typeof title !== "string" ||
        !title.trim() ||
        !Number.isFinite(parsedAmount) ||
        parsedAmount <= 0 ||
        !Number.isSafeInteger(parsedAccountId) ||
        parsedAccountId <= 0
      ) {
        return res
          .status(400)
          .json({
            message:
              "A title, positive amount, and valid accountId are required",
          });
      }
      if (!validTypes.includes(type)) {
        return res
          .status(400)
          .json({ message: `type must be one of: ${validTypes.join(", ")}` });
      }
      if (!validMethods.includes(payMethod)) {
        return res
          .status(400)
          .json({
            message: `payMethod must be one of: ${validMethods.join(", ")}`,
          });
      }
      if (
        parsedCategoryId !== null &&
        (!Number.isSafeInteger(parsedCategoryId) || parsedCategoryId <= 0)
      ) {
        return res
          .status(400)
          .json({ message: "categoryId must be a positive integer" });
      }
      const isTransfer =
        type === "INTERNAL_TRANSFER" || type === "EXTERNAL_TRANSFER";
      if (
        type === "INTERNAL_TRANSFER" &&
        (!Number.isSafeInteger(parsedDestinationId) ||
          parsedDestinationId <= 0 ||
          parsedDestinationId === parsedAccountId)
      ) {
        return res
          .status(400)
          .json({
            message:
              "Choose a different destination account for an internal transfer",
          });
      }
      if (type !== "INTERNAL_TRANSFER" && parsedDestinationId !== null) {
        return res
          .status(400)
          .json({
            message: "Only internal transfers can have a destination account",
          });
      }
      if (isTransfer && parsedCategoryId !== null) {
        return res
          .status(400)
          .json({
            message: "Transfers cannot have an income or expense category",
          });
      }

      const account = await db.account.findFirst({
        where: {
          id: parsedAccountId,
          userId: req.user.id,
        },
      });

      if (!account) {
        return res.status(404).json({ message: "Account not found" });
      }

      if (isTransfer && account.type === "CREDIT") {
        return res
          .status(400)
          .json({
            message:
              "Transfers must originate from a cash, checking, or savings account",
          });
      }
      if (parsedDestinationId !== null) {
        const destination = await db.account.findFirst({
          where: { id: parsedDestinationId, userId },
        });
        if (!destination) {
          return res
            .status(404)
            .json({ message: "Destination account not found" });
        }
      }
      if (parsedCategoryId !== null) {
        const category = await db.category.findFirst({
          where: { id: parsedCategoryId, userId },
        });
        if (!category) {
          return res.status(404).json({ message: "Category not found" });
        }
        if (category.type !== type) {
          return res
            .status(400)
            .json({ message: "Category must match the transaction type" });
        }
      }

      const parsedTransactionDate = transactionDate
        ? parseDateOnly(transactionDate)
        : undefined;

      if (transactionDate && !parsedTransactionDate) {
        return res.status(400).json({
          message: "transactionDate must be a valid date in YYYY-MM-DD format",
        });
      }

      const transaction = await db.transaction.create({
        data: {
          title: title.trim(),
          description,
          amount: parsedAmount,
          type,
          payMethod,
          accountId: parsedAccountId,
          destinationAccountId: parsedDestinationId,
          categoryId: parsedCategoryId,
          transactionDate: parsedTransactionDate,
        },
      });

      res.status(201).json(transaction);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
}

export const createTransaction = createTransactionHandler(prisma);

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
    if (!transToDelete) {
      return res.status(404).json({ message: "Not found" });
    }
    if (transToDelete.account.userId !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }
    if (transToDelete.type === "ACCOUNT_OPENING") {
      return res
        .status(403)
        .json({
          message:
            "Account opening audit entries cannot be deleted individually",
        });
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
