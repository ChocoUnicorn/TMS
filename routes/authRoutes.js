const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { authenticateUser } = require("../middleware/authentication");
// const taskController = require("../controllers/taskController");
// const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes is designed only for user login and sign up of users.

router.post("/login", authController.login);
router.get("/logout", authenticateUser, authController.logout);
router.post("/signup", authController.signUp);

module.exports = router;
