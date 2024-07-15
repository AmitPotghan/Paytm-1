require('dotenv').config()
const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI; // Fetching the connection string from environment variables

if (!uri) {
  throw new Error('MongoDB connection string is missing. Check your environment variables.');
}

mongoose.connect(uri)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        minlength:3,
        maxlength:30
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        maxlength:50
    },
    firstName:{
        type:String,
        required:false,
        trim:true,
        maxlength:30
    },
    lastName:{
        type:String,
        required:false,
        trim:true,
        maxlength:30
    }
})

const accountSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})


const Account = mongoose.model("Account",accountSchema);
const User = mongoose.model("User",userSchema);

module.exports = {User,Account};
