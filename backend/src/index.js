const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware global para serializar BigInt
BigInt.prototype.toJSON = function() {
  return this.toString();
};
// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);
const adminRoutes = require('./routes/adminRoutes');
app.use('/admin', adminRoutes);
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
