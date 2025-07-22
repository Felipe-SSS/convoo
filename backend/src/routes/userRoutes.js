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
 */
const express = require("express");
const router = express.Router();
const authToken = require("../middlewares/authMiddleware");
const authRole = require("../middlewares/roleMiddleware");
const userController = require("../controllers/userController");

// Rotas
router.get("/me", authToken, userController.listUser);

// Rotas de onboarding do usuário
router.post("/onboarding", authToken, userController.upsertOnboarding);
router.get("/onboarding", authToken, userController.getOnboarding);

module.exports = router;
