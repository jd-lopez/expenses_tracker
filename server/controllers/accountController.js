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

    console.log(name);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!userId || !name || !institution || !type || !initialBalance) {
      return res
        .status(400)
        .json({ message: "name, institution, type, balance are required" });
    }

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
