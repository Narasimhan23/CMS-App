const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../../model/user_model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

router.post("/", [
    body("name","Name is required").notEmpty(),
    body("email","Valid Email is required").isEmail(),
    body("password", "Please enter a password with a minimum of 8 letters").isLength({min : 8})
],async (req, res)=> {

    //checking for validation errors
    const errors = validationResult(req);    
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }

    const { name, email, password} = req.body;

    //Registering the User in the DB
    try {
        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({errors: [{ msg: "User already exists"}]})
        }

        user = new User({
            name,
            email,
            password
        })

        //Hashing the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get("jwtSecretToken"),{expiresIn: 3600}, (err,token)=>{
            if(err){
                throw err;
            }
            res.status(200).json({token})
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({errorMessage : "server error"})
    }
});

module.exports = router;