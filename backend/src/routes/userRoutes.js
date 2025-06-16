const express = require('express');
const router = express.Router();
const authToken = require('../middlewares/authMiddleware');
const authRole = require('../middlewares/roleMiddleware');
const userController = require('../controllers/userController');

// Rotas


module.exports = router;
