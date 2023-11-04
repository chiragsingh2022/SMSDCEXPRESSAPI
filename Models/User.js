const mongoose = require('mongoose');
const validator = require('validator');

const adminSchema = new mongoose.Schema({
    userType: {
        type: String,
        required:[true,"Please enter user type"]
    },
    userid: {
        type: String, 
        unique:[true,"User Already Exist"],
        required: [true, "UserId must be entered"],
        validator: [validator.isEmail("abc@gmail.com")]
    },
    password: {
        type: String,
        required: [true, "Password can't be empty"]
    },
    created:{
        type:Date,
        default: Date.now(),
    }
})

module.exports = mongoose.model('User', adminSchema);