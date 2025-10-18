const User = require('../model/UserSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const signup = async (req,resp)=>{
    try{
        const {fullName, email, passwordHash}= req.body;
        const existingUser = await User.findOne({email});
        if(existingUser) return resp.status(409).json({'message':'User Already exists'});
    }catch (e) {
        resp.status(500).json({'message':'Signup Error',error:e});
    }
};
const login = async (req,resp)=>{
    try{

    }catch (e) {
        resp.status(500).json({'message':'Signup Error',error:e});
    }
};