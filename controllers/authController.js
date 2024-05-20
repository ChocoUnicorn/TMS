const User = require("../models/Users");
const bcrypt = require("bcrypt");
const validator = require("validator");
const {
  createJWT,
  createTokenUser,
  attachCookiesToResponse,
} = require("../utils/index");
const { createCustomError } = require("../errors/index");

module.exports = {
  //sign up
  signUp: async (req, res) => {
    const { displayName, name, email, password, phoneNumber } = req.body;
    if (!displayName || !name || !email || !password || !phoneNumber) {
      return res.status(400).json({ message: "Please provide all values" });
    }

    if (typeof displayName !== "string") {
      return res.status(400).json({ message: "Please provide a valid entry" });
    }
    if (typeof name !== "string") {
      return res.status(400).json({ message: "Please provide a valid name" });
    }
    if (validator.isEmail(email) == false) {
      return res.status(400).json({ message: "Please provide a valid email" });
    }
    if (password.length <= 8 && typeof password == "string") {
      return res
        .status(400)
        .json({ message: "Password must be at least 9 characters" });
    }
    if (phoneNumber != 13 && typeof phoneNumber == "bigint") {
      return res
        .status(400)
        .json({ message: "Please provide a valid phone number" });
    }

    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      displayName: displayName,
      name: name,
      email: email,
      password: hashedPassword,
      phoneNumber: phoneNumber,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  },

  //login
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email: email });
      console.log(user);
      if (!user) {
        return res.status(404).json({ message: "User does not exist" });
      }
      const isPasswordVerified = await bcrypt.compareSync(
        password,
        user.password
      );
      if (!isPasswordVerified) {
        return res.status(400).send({ message: "Invalid password" });
      }
      console.log(isPasswordVerified);
      const payload = createTokenUser(user);
      console.log(payload);
      const token = createJWT({ payload });
      console.log(token);
      attachCookiesToResponse({ res, user: payload, token });

      res
        .status(200)
        .json({ token: token, message: "User logged in successfully" });
    } catch (err) {
      res.status(500).json({
        message: "Something went wrong",
        "error-message": err.message,
      });
    }
  },

  //logout
  logout: async (req, res) => {
    if (req.user) {
      await res.cookie("token", "logout", {
        httpOnly: true,
        expires: new Date(Date.now() + 1000),
      });
      res.status(200).json({ message: "User logged out successfully" });
    } else {
      res.status(400).json({ message: "User not logged in" });
    }
  },
};
