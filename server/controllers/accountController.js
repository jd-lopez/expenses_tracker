import { prisma } from "../prisma/client.js";

export const getAccounts = async (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const accounts = await prisma.account.findMany({
    where: {
      userId,
    },
  });

  return res.status(200).json(accounts);
};

export const createAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      name,
      accountNumber,
      institution,
      type,
      initialBalance,
      creditLimit,
    } = req.body;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!name || !institution || !type) {
      return res.status(400).json({
        message: "name, institution, and type are required",
      });
    }

    const accountFourLast = accountNumber ? String(accountNumber).slice(-4) : null;
    const uppertype = type.toUpperCase();
    if (uppertype !== "CASH" && !accountFourLast) {
      return res.status(400).json({
        message: "accountNumber is required for non-cash accounts",
      });
    }

    const parsedInitialBalance =
      uppertype === "CREDIT" ? 0 : Number(initialBalance ?? 0);
    const parsedCreditLimit =
      creditLimit === "" || creditLimit == null ? null : Number(creditLimit);

    if (!Number.isFinite(parsedInitialBalance) || parsedInitialBalance < 0) {
      return res.status(400).json({
        message: "initialBalance must be a non-negative number",
      });
    }

    if (
      uppertype === "CREDIT" &&
      (parsedCreditLimit == null ||
        !Number.isFinite(parsedCreditLimit) ||
        parsedCreditLimit <= 0)
    ) {
      return res.status(400).json({
        message: "creditLimit must be greater than zero for a credit card",
      });
    }

    const account = await prisma.account.create({
      data: {
        userId,
        name,
        accountNumber: accountFourLast,
        institution,
        type: uppertype,
        initialBalance: parsedInitialBalance,
        creditLimit: uppertype === "CREDIT" ? parsedCreditLimit : null,
      },
    });

    return res.status(201).json(account);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const accountId = Number(id);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const actToDelete = await prisma.account.findUnique({
      where: {
        id: accountId,
      },
    });

    if (actToDelete.userId !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const deletedAct = await prisma.$transaction([
      prisma.transaction.deleteMany({
        where: {
          accountId: accountId,
        },
      }),
      prisma.account.delete({
        where: {
          id: accountId,
        },
      }),
    ]);

    return res.status(201).json({ message: "Account deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
