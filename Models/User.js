const mongoose = require('mongoose');
const validator = require('validator');

const adminSchema = new mongoose.Schema({
    userType: {
        type: String,
        required: [true, "Please enter user type"]
    },
    fname: {
        type: String,
    },
    lname: {
        type: String,
    },
    mobile: {
        type: String,
    },
    userid: {
        type: String,
        unique: [true, "User Already Exist"],
        required: [true, "UserId must be entered"],
        validate:{
            validator: validator.isEmail,
            message:'Invalid email format',
        },
    },
    password: {
        type: String,
        required: [true, "Password can't be empty"]
    },
    isAdmin:{
        type:Boolean,
    },
    isTeacher:{
        type:Boolean,
    },
    isStudent:{
        type:Boolean,
    },
    isOther:{
        type:Boolean,
    },
    canviewstudent:{
        type:Boolean,
    },
    canviewregistration:{
        type:Boolean,
    },
    canviewrss:{
        type:Boolean,
    },
    created: {
        type: Date,
        default: Date.now(),
    },
    createdby:{
        type:String,
    }

})

module.exports = mongoose.model('User', adminSchema);