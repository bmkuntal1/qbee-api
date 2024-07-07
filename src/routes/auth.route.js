const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate.middleware");
const authValidation = require("../validations/auth.validation");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userService = require("../services/user.service");
const auth = require("../middlewares/auth.middleware");
const { JWT_SECRET } = process.env;

router.post("/register", validate(authValidation.register), async (req, res) => {
  try {
    var passwordHash = bcrypt.hashSync(req.body.password, 8);
    req.body.password = passwordHash
    const user = await userService.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/login", validate(authValidation.login), async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.findOneByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }
    const payload = {
      id: user.id,
      email: user.email,
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token: `Bearer ${token}` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/me", auth, (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;