const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { sanitizeUser, sanitizeUsers } = require("../utils/sanitizeUser");

exports.listUsers = async (req, res) => {
  const users = await prisma.users.findMany();
  res.json(sanitizeUsers(users));
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const user = await prisma.users.update({
      where: { id: Number(id) },
      data: { name, email },
    });
    res.json(sanitizeUser(user));
  } catch (error) {
    res.status(400).json({
      erro: "Erro ao atualizar usuário",
      detalhe: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.users.delete({
      where: { id: Number(id) },
    });
    res.json({ mensagem: "Usuário deletado com sucesso!" });
  } catch (error) {
    res.status(400).json({
      erro: "Erro ao deletar usuário",
      detalhe: error.message,
    });
  }
};
