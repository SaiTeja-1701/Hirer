const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String, // hash with bcrypt
});

module.exports = mongoose.model("User", UserSchema);
