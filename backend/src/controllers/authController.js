const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sanitizeUser } = require("../utils/sanitizeUser");
const { success } = require("../utils/response");

exports.register = async (req, res, next) => {
  // --- DEBUGGING LOG ---
  // Este log é a ferramenta mais importante que temos agora. Ele mostra o que o servidor REALMENTE recebeu.
  console.log('>>> [REGISTO] Corpo da requisição recebido:', req.body);

  // Recebe os campos que o frontend irá enviar
  const { firstName, lastName, username, email, password, birthdate } = req.body;

  // Validação para garantir que todos os campos necessários chegaram
if (!firstName || !lastName || !username || !email || !password || !birthdate) {
  const err = new Error("Campos obrigatórios em falta.");
  err.status = 400;
  err.detalhe = "O servidor espera: firstName, lastName, username, email, password, birthdate.";
  return next(err);
}

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.users.create({
      data: {
        username,
        email,
        password: hashedPassword,
        user_profiles: {
          create: {
            first_name: firstName,
            last_name: lastName,
            birthdate: new Date(birthdate),
            // Valores padrão para campos obrigatórios
            intent: "learn", // valor padrão para intent
            interests: [], // array vazio como JSON
            languages: [], // array vazio como JSON
            nickname: firstName, // usa o primeiro nome como nickname
          },
        },
        // Criar também user_stats com valores padrão
        user_stats: {
          create: {
            min_talked: 0,
            practice_sequence: 0,
          },
        },
      },
      include: {
        user_profiles: true,
        user_stats: true,
      },
    });
    console.log('✅ [REGISTO] Utilizador criado com sucesso:', user.email);
    res.status(201).json(success(sanitizeUser(user)));
  } catch (error) {
    next(error);
  }
};

// A sua função de login permanece a mesma, mas vamos garantir que está consistente
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.users.findUnique({
      where: { email },
      include: { roles: true, user_profiles: true },
    });
    if (!user) return res.status(401).json({ erro: "Credenciais inválidas" });
    const senhaCorreta = await bcrypt.compare(password, user.password);
    if (!senhaCorreta) return res.status(401).json({ erro: "Credenciais inválidas" });
    const token = jwt.sign(
      { userId: user.id, name: user.username, role: user.roles.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json(success({ token, user: sanitizeUser(user) }));
  } catch (error) {
    next(error);
  }
};
