const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Password is required"],
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
});

module.exports = mongoose.model("users", userSchema);
