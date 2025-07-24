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
 *
 * /users/onboarding:
 *   post:
 *     summary: Cria ou atualiza os dados de onboarding do usuário autenticado
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
 *               country:
 *                 type: string
 *               languages:
 *                 type: array
 *                 items:
 *                   type: string
 *               interests:
 *                 type: array
 *                 items:
 *                   type: string
 *               intent:
 *                 type: string
 *               nickname:
 *                 type: string
 *               birthdate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Dados de onboarding criados ou atualizados com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token não fornecido ou inválido
 *       500:
 *         description: Erro interno no servidor
 *   get:
 *     summary: Retorna os dados de onboarding do usuário autenticado
 *     tags:
 *       - Usuário
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados de onboarding do usuário
 *       401:
 *         description: Token não fornecido ou inválido
 *       404:
 *         description: Dados de onboarding não encontrados
 *       500:
 *         description: Erro interno no servidor
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
router.get("/me", authToken, userController.listUser);

// Rotas de onboarding do usuário
router.post("/onboarding", authToken, userController.upsertOnboarding);
router.get("/onboarding", authToken, userController.getOnboarding);

router.post("/me/profile-picture", authToken, upload.single("profile_picture"), userController.uploadProfilePicture);

module.exports = router;
