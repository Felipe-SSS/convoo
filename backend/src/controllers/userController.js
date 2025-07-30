const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { sanitizeUser } = require("../utils/sanitizeUser");
const { success } = require("../utils/response");

exports.listUser = async (req, res) => {
  try {
    const user = await prisma.users.findUniqueOrThrow({
      where: { id: Number(req.user.userId) }, // Corrigido: usar userId
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
      res.status(500).json({
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

exports.getUserInfo = async (req, res) => {
  try {
    const userId = req.user.userId; // Corrigido: usar userId
    console.log('getUserInfo - userId recebido:', userId);
    
    const user = await prisma.users.findUnique({
      where: { id: userId },
      include: {
        user_profiles: {
          select: {
            first_name: true,
            last_name: true,
            country: true,
            nickname: true
          }
        }
      }
    });

    console.log('getUserInfo - user encontrado:', user);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const userInfo = {
      id: user.id,
      name: `${user.user_profiles?.first_name || ''} ${user.user_profiles?.last_name || ''}`.trim() || user.username,
      nickname: user.user_profiles?.nickname || '',
      country: user.user_profiles?.country || 'Não informado',
      username: user.username
    };

    console.log('getUserInfo - Dados encontrados:', {
      user_profiles: user.user_profiles,
      final_userInfo: userInfo
    });

    res.json({ success: true, data: userInfo });
  } catch (error) {
    console.error('Erro ao obter informações do usuário:', error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await prisma.users.findUnique({
      where: { id: Number(userId) },
      include: {
        user_profiles: {
          select: {
            first_name: true,
            last_name: true,
            country: true,
            nickname: true
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const userInfo = {
      id: user.id,
      name: `${user.user_profiles?.first_name || ''} ${user.user_profiles?.last_name || ''}`.trim() || user.username,
      nickname: user.user_profiles?.nickname || '',
      country: user.user_profiles?.country || 'Não informado',
      username: user.username
    };

    console.log('getUserById - Dados encontrados:', {
      userId: userId,
      user_profiles: user.user_profiles,
      final_userInfo: userInfo
    });

    res.json({ success: true, data: userInfo });
  } catch (error) {
    console.error('Erro ao obter informações do usuário por ID:', error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};