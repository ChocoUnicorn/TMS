const express = require("express");
const app = express();
const mongoose = require("mongoose");
var cookieParser = require("cookie-parser");

const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

//connect to database
connectDB();

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Cookie-parsing
app.use(cookieParser(process.env.COOKIE_SECRET));

//Setup Routes For Which The Server Is Listening
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);

//Server Running
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}!`);
});
