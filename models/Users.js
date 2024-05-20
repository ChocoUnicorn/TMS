const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  displayName: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true, min: 9 },
  phoneNumber: { type: Number, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
