const express = require('express');
const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET

const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        res.status(403).json({msg:"Doesn't start with Bearer"});
        return;
    }
    try{
        const token = authHeader.split(' ')[1];
        const decode = jwt.verify(token,JWT_SECRET);
        req.userId = decode.userId;
        next();
        return;
    }catch(err){
        return res.status(403).json({msg:"error"});
    }
}

module.exports = authMiddleware;