const bcrypt = require("bcryptjs");
const validator = require("validator");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// Register Page
exports.getRegister = (req, res) => res.render("register");

// Register User
exports.postRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!validator.isEmail(email)) return res.send("❌ Invalid Email");
    if (!validator.isStrongPassword(password, { minSymbols: 0 }))
      return res.send("❌ Weak Password. Use at least 8 chars, uppercase, lowercase, number.");

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.send("⚠️ User already exists!");

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });

    res.redirect("/login");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Login Page
exports.getLogin = (req, res) => res.render("login");

// Login User
exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.send("❌ User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.send("❌ Invalid Credentials");

    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only https in prod
      sameSite: "strict"
    });

    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Dashboard
exports.getDashboard = (req, res) => {
  res.render("dashboard", { user: req.user });
};

// Logout
exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};
