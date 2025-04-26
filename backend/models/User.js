const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  dob: String,
  role: { type: String, enum: ["Admin", "Explorer"] },
  location: String,
  password: String,
});

const userModel = mongoose.model("User", userSchema);

module.exports=userModel
