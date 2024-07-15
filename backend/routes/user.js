const express = require("express");
const router = express.Router();

const zod = require('zod');
const {User,Account} = require('../db.js');
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET
const authMiddleware = require('../middlewares/middleware.js');

const signupbody = zod.object({
    username:zod.string().trim().email().min(3).max(30),
    password:zod.string().min(8).max(50),
    firstName:zod.string().trim().max(30),
    lastName:zod.string().trim().max(30)
})
const signinbody = zod.object({
    username:zod.string().trim().email().min(3).max(30),
    password:zod.string().min(8).max(50)
})
const updateBody = zod.object({
    password:zod.string().min(8).max(50),
    firstName:zod.string().trim().max(30),
    lastName:zod.string().trim().max(30)
})

router.post('/signup',async(req,res,next)=>{
    try{
        const userData = {
            username : req.body.username,
            password : req.body.password,
            firstName : req.body.firstName,
            lastName : req.body.lastName,
        }
        let success = signupbody.safeParse(userData);
        if(!success){
            res.status(411).json({
                msg:"Invalid input"
            })
            return;
        }
        const existingUser = await User.findOne({username : userData.username})
        if(existingUser){
            res.status(411).json({
                msg:"username already exist"
            })
            return;
        }
        let newUser = await User.create(userData);
        let userId = newUser._id;
    
        let accountData = {
            userId:userId,
            balance:1000
        }
        let account = await Account.create(accountData);
    
        const token = jwt.sign({userId},JWT_SECRET);
        
        res.status(200).json({
            msg:"User Created Successfully",
            token:token
        })
    }
    catch(err){
        next(new Error("Error in User Validation"));
    }
    
})

router.post('/signin',async(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    
    let success = signinbody.safeParse({username:username,password:password});
    if(!success){
        res.status(411).json({
            msg:"Invalid input"
        })
        return;
    }
    const existingUser = await User.findOne({
        username:username,
        password:password
    })
    if(existingUser == null){
        res.status(411).json({
            msg:"Invalid Credentials"
        })
        return;
    }
    const userId = existingUser._id;
    let token = jwt.sign({userId},JWT_SECRET);
    res.status(200).json({
        msg:"Sign In Successfully",
        token:token
    })
    
})
router.put('/',authMiddleware,async(req,res)=>{
    let success = updateBody.safeParse(req.body);
    if(!success){
        res.status(411).json({
            msg:"Error while Updating Information"
        })
        return;
    }
    await User.updateOne({_id:req.userId},req.body)
    res.status(200).json({
        msg:"Successfully updated the Information"
    })
})
router.get('/bulk',async(req,res)=>{
    const filter = req.query.filter || "";
    const users = await User.find({
        $or:[{
            firstName :{
                $regex: new RegExp(filter, "i")// for case insensitive search can also use $regex:filter
            }
        },{
            lastName:{
                $regex: new RegExp(filter, "i")
            }
        }]
    })
    res.status(200).json({
        user:users.map((user)=>{
            return{
                username:user.username,
                firstName:user.firstName,
                lastName:user.lastName,
                _id:user._id
            };
        })
    })
})

module.exports = router;