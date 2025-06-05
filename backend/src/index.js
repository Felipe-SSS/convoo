const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Rota de boas-vindas
app.get('/', (req, res) => {
  res.send('API de usuários funcionando! 🚀');
});

// Rota para criar usuário
app.post('/create/roles', async (req, res) => {
  const { id,name,description } = req.body;
  try {
    const role = await prisma.roles.create({
      data: { id,name,description },
    });
    res.status(201).json(role);
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao criar usuário', detalhe: error.message });
  }
});

// Rota para listar usuários
app.get('/roles', async (req, res) => {
  const roles = await prisma.roles.findMany();
  res.json(roles);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
