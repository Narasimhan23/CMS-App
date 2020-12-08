const jwt = require("jsonwebtoken");
const config = require("config");


module.exports = (req,res,next) => {
    const token = req.header('x-auth-token');

    if(!token){
        return res.status(401).json({msg: "Not Authourized"});
    }

    try {
        const decoded = jwt.verify(token,config.get("jwtSecretToken"));
        req.user = decoded.user;
        
        next();
    } catch (err) {
        res.status(401).json({msg: "Token is not valid"});
    }
}