/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Retorna os dados do usuário autenticado
 *     tags:
 *       - Usuário
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuário
 *       401:
 *         description: Token não fornecido ou inválido
 *       403:
 *         description: Acesso negado (role insuficiente)
 *       404:
 *         description: Usuário não encontrado
 *   put:
 *     summary: Atualiza os dados do usuário autenticado (pelomenos um campo é necessário)
 *     tags:
 *       - Usuário
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               phone:
 *                 type: string
 *               bio:
 *                 type: string
 *               country:
 *                 type: string
 *               intent:
 *                 type: string
 *               interests:
 *                 type: array
 *                 items:
 *                   type: string
 *               languages:
 *                 type: array
 *                 items:
 *                   type: string
 *               nickname:
 *                 type: string
 *     responses:
 *       200:
 *         description: Dados do usuário atualizados com sucesso
 *       400:
 *         description: Nenhum dado para atualizar
 *       401:
 *         description: Token não fornecido ou inválido
 *       403:
 *         description: Acesso negado (role insuficiente)
 *       404:
 *         description: Usuário não encontrado
 */

/**
 * @swagger
 * /users/me/profile-picture:
 *   post:
 *     summary: Faz upload da foto de perfil do usuário autenticado
 *     tags:
 *       - Usuário
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profile_picture:
 *                 type: string
 *                 format: binary
 *                 description: Arquivo de imagem da foto de perfil
 *     responses:
 *       200:
 *         description: Foto de perfil atualizada com sucesso
 *       400:
 *         description: Nenhum arquivo enviado
 *       401:
 *         description: Token não fornecido ou inválido
 *       500:
 *         description: Erro interno no servidor
 */

const express = require("express");
const router = express.Router();
const authToken = require("../middlewares/authMiddleware");
const authRole = require("../middlewares/roleMiddleware");
const userController = require("../controllers/userController");
const upload = require("../middlewares/uploadMiddleware");

// Rotas
router.get("/me", authToken, authRole("User"), userController.listUser);
router.get("/info", authToken, authRole("User"),userController.getUserInfo);
router.get("/:userId", authRole("User"),userController.getUserById); // Nova rota para obter usuário por ID
router.put("/me", authToken, authRole("User"), userController.updateUser);
router.post("/me/profile-picture", authToken, authRole("User"), upload.single("profile_picture"), userController.uploadProfilePicture);

module.exports = router;
