const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User =require("../../model/user_model");
const {body, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

router.get("/", auth, async (req,res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(400).json({msg: "Server error"});
    }
})

router.post("/", [
    body('email',"Valid Email is required").isEmail(),
    body("password","Please enter a password").exists()
],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({errors: [{msg: "Invalid credentials"}]})
        }

        const valid = await bcrypt.compare(password, user.password);
        
        if(!valid){
            return res.status(400).json({errors: [{msg: "Invalid credentials"}]})
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get("jwtSecretToken"),{expiresIn: 3600},(err,token)=>{
            if(err){
                throw err;
            }
            res.status(200).json({token})
        })

    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
})

module.exports = router;
