const jwt = require('jsonwebtoken');
const User = require("../model/UserSchema");

const authMiddleware = (req, resp, next)=>{
    try{
     const authHeader = req.headers['authorization'];
     if(!authHeader){
        return resp.status(401).json({'message':'Authentication header is missing..'});
     }
     const token = authHeader.split(" ")[1];
     if(!token){
             return resp.status(401).json({'message':'Token is missing..'});
     }
     jwt.verify(token, process.env.JWT_SECRET);
     req.userEmail = decoded.email;
     next();

    }catch(e){
        resp.status(500).json({ 'message': "Invalid or expired token"});
    }


}

module.exports=authMiddleware;