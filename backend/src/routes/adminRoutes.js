/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Lista todos os usuários
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 *       401:
 *         description: Token não fornecido ou inválido
 *       403:
 *         description: Acesso negado (role insuficiente)
 *   put:
 *     summary: Atualiza um usuário pelo ID
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado
 *       401:
 *         description: Token não fornecido ou inválido
 *       403:
 *         description: Acesso negado (role insuficiente)
 *   delete:
 *     summary: Deleta um usuário pelo ID
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário deletado
 *       401:
 *         description: Token não fornecido ou inválido
 *       403:
 *         description: Acesso negado (role insuficiente)
 */

const express = require("express");
const router = express.Router();
const authToken = require("../middlewares/authMiddleware");
const authRole = require("../middlewares/roleMiddleware");
const adminController = require("../controllers/adminController");

// Rotas
router.get("/users", authToken, authRole("Admin"), adminController.listUsers);
router.put("/users/:id", authToken, authRole("Admin"), adminController.updateUser);
router.delete("/users/:id", authToken, authRole("Admin"), adminController.deleteUser);

module.exports = router;
