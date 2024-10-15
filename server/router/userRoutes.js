const express = require("express");
const router = express.Router();
const {
  loginValidationSchemma,
  signupValidationSchemma,
} = require("../validation/authValidation");

router.post("/login", (req, res) => {});

router.post("/register", (req, res) => {
  const { error } = signupValidationSchemma.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  console.log(req.body);
});

module.exports = router;
