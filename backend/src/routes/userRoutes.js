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
 * /users/info:
 *   get:
 *     summary: Retorna informações básicas do usuário autenticado
 *     tags:
 *       - Usuário
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Informações básicas do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     nickname:
 *                       type: string
 *                     country:
 *                       type: string
 *                     username:
 *                       type: string
 *       401:
 *         description: Token não fornecido ou inválido
 *       404:
 *         description: Usuário não encontrado
 */

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Retorna informações públicas de um usuário pelo ID
 *     tags:
 *       - Usuário
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Informações públicas do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     nickname:
 *                       type: string
 *                     country:
 *                       type: string
 *                     username:
 *                       type: string
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
const userController = require("../controllers/userController");
const upload = require("../middlewares/uploadMiddleware");

// Rotas
router.get("/me", authToken, userController.listUser);
router.get("/info", authToken, userController.getUserInfo);
router.get("/:userId", userController.getUserById); // Nova rota para obter usuário por ID
router.put("/me", authToken, userController.updateUser);
router.post("/me/profile-picture", authToken, upload.single("profile_picture"), userController.uploadProfilePicture);

module.exports = router;
