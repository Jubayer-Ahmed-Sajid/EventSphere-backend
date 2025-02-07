const express = require("express");
const router = express.Router();
const jwtConfig = require("../config/jwtConfig");
const joi = require("joi");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
const userSchema = require("../Schemas/userSchema");
const userSchemaValidation = joi.object({
  fullname: joi.string().required(),
  email: joi.string().email().required(),
  photoURL: joi.string().required(),
});
const User = mongoose.model("User", userSchema);

// Register route
router.post("/register", async (req, res) => {
  const { error } = userSchemaValidation.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const isExist = await User.findOne({ email: req.body.email });
  if (isExist) {
    return res.status(400).json({ message: "Email already exists" });
  }
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", data: savedUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  // Login logic here
  const { email } = req.body;
  console.log(email,jwtConfig.secret)
  const token = jwt.sign({email} , process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  res.json({ token });
});

module.exports = router;
