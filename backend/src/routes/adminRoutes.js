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
