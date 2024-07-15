const express = require("express");
const router = express.Router();

const userRouter = require("./user.js");
const accountRouter = require("./account.js");

router.use('/user',userRouter);
router.use('/account',accountRouter);
router.get('/',(req,res)=>{
    res.send("router working");
})

module.exports = router;
