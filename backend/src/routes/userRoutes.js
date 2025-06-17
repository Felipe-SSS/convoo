const express = require("express");
const router = express.Router();
const authToken = require("../middlewares/authMiddleware");
const authRole = require("../middlewares/roleMiddleware");
const userController = require("../controllers/userController");

// Rotas
router.get("/me", authToken, userController.listUser);

module.exports = router;
