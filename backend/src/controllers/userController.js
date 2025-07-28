const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { sanitizeUser } = require("../utils/sanitizeUser");
const { success } = require("../utils/response");

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
      err.detalhe = error.message;
      next(err);
    } else {
      next(error);
    }
  }
};

exports.updateUser = async (req, res, next) => {
  const {id} = req.user.userId;
  const { 
    first_name,
    last_name,
    phone,
    bio,
    country,
    intent,
    interests,
    languages,
    nickname,
  } = req.body;

  const data = {};
  if (first_name) data.first_name = first_name;
  if (last_name) data.last_name = last_name;
  if (phone) data.phone = phone;
  if (bio) data.bio = bio;
  if (country) data.country = country;
  if (intent) data.intent = intent;
  if (interests) data.interests = interests;
  if (languages) data.languages = languages;
  if (nickname) data.nickname = nickname;

  if (Object.keys(data).length === 0) {
    const err = new Error("Nenhum dado para atualizar.");
    err.status = 400;
    err.detalhe = "Envie pelo menos um campo para atualizar.";
    return next(err);
  }

  try {
    const user = await prisma.user_profiles.update({
      where: { user_id: Number(id) },
      data,
    });
    res.json(success(sanitizeUser(user)));
  } catch (error) {
    if (error.code === "P2025") {
      const err = new Error("Usuário não encontrado.");
      err.status = 404;
      err.detalhe = error.message;
      return next(err);
    }
    next(error);
  }
};

// Função para upload da foto de perfil
// Campo do formulário deve ser 'profile_picture'
exports.uploadProfilePicture = async (req, res, next) => {
  const userId = req.user.userId;
  if (!req.file) {
    const err = new Error("Nenhum arquivo enviado.");
    err.status = 400;
    err.detalhe = "Envie um arquivo de imagem para atualizar a foto de perfil.";
    return next(err);
  }
  try {
    const profilePictureName = req.file.filename;
    const userProfile = await prisma.user_profiles.update({ 
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
