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
    const { name, institution, type, initialBalance } = req.body;
    console.log(name, institution, type, userId, initialBalance);

    console.log(name);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!userId || !name || !institution || !type) {
      return res.status(400).json({ message: "name, institution, type, " });
    }

    if (initialBalance === " ") initialBalance = 0;

    const uppertype = type.toUpperCase();
    console.log(uppertype);
    const account = await prisma.account.create({
      data: {
        userId,
        name,
        institution,
        type: uppertype,
        initialBalance,
      },
    });

    console.log(typeof initialBalance);

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
