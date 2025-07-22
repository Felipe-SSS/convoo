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
    next(error);
  }
};
