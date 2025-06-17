const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Rotas
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/create-admin", authController.criarAdmin);

module.exports = router;
