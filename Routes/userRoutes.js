const express = require("express");
const joi = require("joi");
const router = express.Router();
const mongoose = require("mongoose");
const userSchema = require("../Schemas/userSchema");
const userSchemaValidation = joi.object({
  fullname: joi.string().required(),
  email: joi.string().email().required(),
  photoURL: joi.string().required(),
});
const User = mongoose.model('User', userSchema);

// insert a user
router.post("/", async (req, res) => {
    const { error } = userSchemaValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const newUser =new User(req.body);
    try {
      const savedUser = await newUser.save();
      res
        .status(201)
        .json({ message: "User created successfully", data: savedUser });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

// get a user
router.get("/:email", async (req, res) => {
    try{
        const email = req.params.email;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json({message:"User found", user});
    }
    catch(err){
        res.status(500).json({message: "Internal server error"});
    }
});



// get all users
router.get("/users/all", async(req,res)=>{
    try{
        const users = await User.find();
        res.status(200).json({message:"Users found",data:users});
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
});

module.exports = router;
