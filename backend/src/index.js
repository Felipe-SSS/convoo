const express = require("express");
const cors = require("cors");
const setupSwagger = require('./swagger');
const errorMiddleware = require("./middlewares/errorMiddleware");
const path = require('path');
require("dotenv").config();

const app = express();
const PORT = /*process.env.PORT ||*/ 3000;

// Middleware global para serializar BigInt
BigInt.prototype.toJSON = function () {
  return this.toString();
};

// Middlewares
app.use(cors());
app.use(express.json());
// Servir arquivos estáticos da pasta uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
setupSwagger(app);

// Rotas
const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);
const adminRoutes = require("./routes/adminRoutes");
app.use("/admin", adminRoutes);
const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);

// Middleware de erro (deve ser o ultimo e ficar depois das rotas)
app.use(errorMiddleware);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});