const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sanitizeUser } = require("../utils/sanitizeUser");

exports.register = async (req, res) => {
  // --- DEBUGGING LOG ---
  // Este log é a ferramenta mais importante que temos agora. Ele mostra o que o servidor REALMENTE recebeu.
  console.log('>>> [REGISTO] Corpo da requisição recebido:', req.body);

  // Recebe os campos que o frontend irá enviar
  const { firstName, lastName, username, email, password, birthdate } = req.body;

  // Validação para garantir que todos os campos necessários chegaram
  if (!firstName || !lastName || !username || !email || !password || !birthdate) {
    return res.status(400).json({
      erro: "Campos obrigatórios em falta.",
      detalhe: "O servidor espera: firstName, lastName, username, email, password, birthdate.",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o Utilizador e o Perfil numa única transação
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
          },
        },
      },
      include: {
        user_profiles: true,
      },
    });

    console.log('✅ [REGISTO] Utilizador criado com sucesso:', user.email);
    res.status(201).json(sanitizeUser(user));

  } catch (error) {
    // --- DEBUGGING LOG ---
    console.error('❌ [REGISTO] ERRO AO CRIAR UTILIZADOR:', error);

    if (error.code === 'P2002') {
      const target = error.meta.target;
      return res.status(409).json({
        erro: `Conflito de dados.`,
        detalhe: `O ${target.includes('email') ? 'email' : 'username'} já está em uso.`,
      });
    }
    
    res.status(500).json({
      erro: "Erro interno no servidor ao criar utilizador.",
      detalhe: error.message,
    });
  }
};

// A sua função de login permanece a mesma, mas vamos garantir que está consistente
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.users.findUnique({
      where: { email },
      include: { roles: true, user_profiles: true }, // Incluir perfis no login também
    });
    if (!user) return res.status(401).json({ erro: "Credenciais inválidas" });

    const senhaCorreta = await bcrypt.compare(password, user.password);
    if (!senhaCorreta) return res.status(401).json({ erro: "Credenciais inválidas" });

    const token = jwt.sign(
      { userId: user.id, name: user.username, role: user.roles.name },
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