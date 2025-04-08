const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");   

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false, // User is inactive until they verify
  },
  activationToken: {
    type: String, 
  }
});

// Hash password before saving the user
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Skip hashing if password isn't modified

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate activation token
UserSchema.methods.generateActivationToken = function () {
  this.activationToken = crypto.randomBytes(32).toString("hex");
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
