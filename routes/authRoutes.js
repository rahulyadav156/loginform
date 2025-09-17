const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const loginLimiter = require("../middlewares/rateLimiter");

// Register
router.get("/", authController.getRegister);
router.post("/register", authController.postRegister);

// Login (rate limited)
router.get("/login", authController.getLogin);
router.post("/login", loginLimiter, authController.postLogin);

// Dashboard (Protected)
router.get("/dashboard", authMiddleware, authController.getDashboard);

// Logout
router.get("/logout", authController.logout);

module.exports = router;
