const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sanitizeUser } = require("../utils/sanitizeUser");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.users.create({
      data: { username: name, email: email, password: hashedPassword },
    });
    res
      .status(201)
      .json({ id: user.id, name: user.username, email: user.email });
  } catch (error) {
    res
      .status(400)
      .json({ erro: "Erro ao criar usuário", detalhe: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.users.findUnique({
      where: { email },
      include: { roles: true },
    });
    if (!user) return res.status(401).json({ erro: "Usuário não encontrado" });

    const senhaCorreta = await bcrypt.compare(password, user.password);
    if (!senhaCorreta) return res.status(401).json({ erro: "Senha inválida" });

    const token = jwt.sign(
      { userId: user.id, name: user.name, role: user.roles.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: sanitizeUser(user),
    });
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao fazer login", detalhe: error.message });
  }
};

exports.criarAdmin = async (req, res) => {
  const senhaHash = await bcrypt.hash("admin123", 10);

  const user = await prisma.users.create({
    data: {
      username: "admin123",
      email: "admin123@teste.com",
      password: senhaHash,
      role_id: 1,
    },
  });

  res.status(201).json({ mensagem: "Admin criado" });
};
