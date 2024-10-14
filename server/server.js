const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./router/userRoutes");

const app = express();

dotenv.config();

connectDB();

app.use(express.json());

app.use("/api/user", userRoutes);
app.get("/", (req, res) => {
  res.send("Api is running...");
});
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});
