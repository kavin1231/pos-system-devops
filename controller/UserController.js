const User = require('../model/UserSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const signup = async(req,resp)=>{

   try{
    const {fullName, email, passwordHash}= req.body;
    const existingUser = await User.findOne({email});
    if(existingUser) return resp.status(409).json({'message':'User Already Exists'});

    const hashedPassword = await bcrypt.hash(passwordHash,10);
    const savedUser= await User.create({fullName, email, hashedPassword});
    resp.status(201).json({'message':'User Created Successfully',data:savedUser});

   }catch(e){
       res.status(500).json({'message':'Signup Error',error:e});
   }


}

const login = async(req,resp)=>{

   try{

   }catch(e){
       res.status(500).json({'message':'Login Error',error:e});
   }


}


module.exports={signup,login};