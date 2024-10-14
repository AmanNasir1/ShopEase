const express = require("express");

const router = express.Router();

router.post("/login", (req, res) => {
  res.send("Hello world");
});

router.post("/register", (req, res) => {});

module.exports = router;
