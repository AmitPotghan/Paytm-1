const express = require('express');
const authMiddleware = require('../middlewares/middleware');
const {User,Account}= require('../db.js')
const mongoose = require('mongoose')
const router = express.Router();


router.post('/transfer',authMiddleware,async(req,res)=>{
    //using transactions
    const session = await mongoose.startSession();
    session.startTransaction();

    const toAccount = req.body.toAccount;
    const amount = req.body.amount;

    const account = await Account.findOne({
        userId:req.userId
    })
    if(account.balance < amount){
        await session.abortTransaction();
        res.status(411).json({
            msg:"Insufficient Balance"
        })
        return;
    }
    const benificiary = await Account.findOne({
        userId:toAccount
    })
    if(!benificiary){
        await session.abortTransaction();
        res.status(411).json({
            msg:"Benificiary Account Doesn't exist"
        })
        return;
    }
    await Account.findOneAndUpdate({userId:account.userId},{$inc:{balance:-amount}});
    await Account.findOneAndUpdate({userId:toAccount},{$inc:{balance:amount}});
    await session.commitTransaction();

    res.status(200).json({
        msg:"Transactions Successful"
    })
    
})

router.get('/balance',authMiddleware,async(req,res)=>{
    const account = await Account.findOne({
        userId:req.userId
    })
    res.status(200).json({
        balance:account.balance
    })
})
module.exports = router;