const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { sanitizeUser } = require("../utils/sanitizeUser");

exports.listUser = async (req, res) => {
  try {
    const user = await prisma.users.findUniqueOrThrow({
      where: { id: Number(req.user.userId) },
      include: { user_profiles: true },
    });
    res.json(sanitizeUser(user));
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
