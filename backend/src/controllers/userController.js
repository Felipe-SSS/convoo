const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { sanitizeUser } = require("../utils/sanitizeUser");
const { success } = require("../utils/response");

exports.listUser = async (req, res) => {
  try {
    const user = await prisma.users.findUniqueOrThrow({
      where: { id: Number(req.user.userId) },
      include: { user_profiles: true },
    });
    res.json(success(sanitizeUser(user)));
  } catch (error) {
    if (error.code === "P2025") {
      res.status(404).json({
        erro: "Usuario nao encontrado",
        detalhe: error.message,
      });
    } else {
      res.stats(500).json({
        erro: "Erro interno no servidor",
        detalhe: error.message,
      });
    }
  }
};

exports.upsertOnboarding = async (req, res) => {
  const userId = req.user.userId;
  const {
    country,
    languages,
    interests,
    intent,
    nickname,
    birthdate
  } = req.body;

  try {
    const onboarding = await prisma.user_onboarding.upsert({
      where: { user_id: userId },
      update: {
        country,
        languages,
        interests,
        intent,
        nickname,
        birthdate: new Date(birthdate),
        updated_at: new Date()
      },
      create: {
        user_id: userId,
        country,
        languages,
        interests,
        intent,
        nickname,
        birthdate: new Date(birthdate)
      }
    });
    res.status(200).json(onboarding);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOnboarding = async (req, res) => {
  const userId = req.user.userId;
  try {
    const onboarding = await prisma.user_onboarding.findUnique({
      where: { user_id: userId }
    });
    res.status(200).json(onboarding);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};