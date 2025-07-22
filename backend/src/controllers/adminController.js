const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { sanitizeUser, sanitizeUsers } = require("../utils/sanitizeUser");
const { success } = require("../utils/response");

exports.listUsers = async (req, res) => {
  const users = await prisma.users.findMany();
  res.json(success(sanitizeUsers(users)));
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const user = await prisma.users.update({
      where: { id: Number(id) },
      data: { name, email },
    });
    res.json(success(sanitizeUser(user)));
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.users.delete({
      where: { id: Number(id) },
    });
    res.json(success({ mensagem: "Usuário deletado com sucesso!" }));
  } catch (error) {
    next(error);
  }
};
