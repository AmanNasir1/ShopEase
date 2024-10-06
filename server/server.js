const express = require("express");
const dotenv = require("dotenv");
const pool = require('./config/db')
const app = express();

dotenv.config();

app.use(express.json());

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()"); // Sample query
    res.json({ currentTime: result.rows[0] });
  } catch (error) {
    console.error("Error connecting to the database", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});
