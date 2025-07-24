const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { sanitizeUser } = require("../utils/sanitizeUser");
const { success } = require("../utils/response");

// Função para upload da foto de perfil
// Campo do formulário deve ser 'profile_picture'
exports.uploadProfilePicture = async (req, res, next) => {
  const userId = req.user.userId;
  if (!req.file) {
    const err = new Error("Nenhum arquivo enviado.");
    err.status = 400;
    err.detalhe = "Envie um arquivo de imagem para atualizar a foto de perfil.";
    next(err);
  }
  try {
    const profilePictureName = req.file.filename;
    const userProfile = await prisma.user_profiles.update({ // TODO@Jhone93567 Garantir que o usuário tenha um perfil antes de atualizar
      where: { user_id: Number(userId) },
      data: { profile_picture: profilePictureName }
    });
    res.json(success({
      mensagem: "Foto de perfil atualizada com sucesso."
    }));
  } catch (error) {
    next(error);
  }
};

exports.listUser = async (req, res, next) => {
  try {
    const user = await prisma.users.findUniqueOrThrow({
      where: { id: Number(req.user.userId) },
      include: { user_profiles: true },
    });
    // Adiciona caminho público da imagem, se existir
    if (user.user_profiles.profile_picture) {
      user.user_profiles.profile_picture = `/uploads/${user.user_profiles.profile_picture}`;
    }
    res.json(success(sanitizeUser(user)));
  } catch (error) {
    if (error.code === "P2025") {
      const err = new Error("Usuário não encontrado.");
      err.status = 404;
      err.message = error.message;
      next(err);
    } else {
      next(error);
    }
  }
};

exports.upsertOnboarding = async (req, res, next) => {
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
    res.status(200).json(success(onboarding));
  } catch (error) {
    next(error);
  }
};

exports.getOnboarding = async (req, res, next) => {
  const userId = req.user.userId;
  try {
    const onboarding = await prisma.user_onboarding.findUnique({
      where: { user_id: userId }
    });
    res.status(200).json(success(onboarding));
  } catch (error) {
    next(error);
  }
};