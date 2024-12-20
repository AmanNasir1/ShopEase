const express = require("express");
const router = express.Router();
const {
  loginValidationSchema,
  signupValidationSchema,
} = require("../validation/authValidation");
const User = require("../model/User");
const { generateToken, verifyToken } = require("../utils/jwtHelper");

// Login Route
router.post("/login", async (req, res) => {
  const { error } = loginValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Email not found" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid Credentials" });
    }

    const token = generateToken(user);
    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Register Route
router.post("/register", async (req, res) => {
  const { error } = signupValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }

  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    user = new User({ name, email, password });
    await user.save();
    
    const token = generateToken(user);
    res.status(201).json({ success: true, user, token });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
});

// Get Current User
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Fetch user error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
});

module.exports = router;
