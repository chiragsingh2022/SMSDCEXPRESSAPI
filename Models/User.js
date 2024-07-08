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
    image:String,
    isAdmin:{
        type:Boolean,
        //default:false,
    },
    isTeacher:{
        type:Boolean,
        //default:false,
    },
    isStudent:{
        type:Boolean,
       // default:false,
    },
    isOther:{
        type:Boolean,
        //default:false,
    },
    canviewstudent:{
        type:Boolean,
        //default:false,
    },
    canviewregistration:{
        type:Boolean,
        //default:false,
    },
    canviewrss:{
        type:Boolean,
        //default:false,
    },
    canviewsettings:{
        type:Boolean,
        //default:false,
    },
    canviewstaff:{
        type:Boolean,
        //default:false,
    },
    candeletestudent:{
        type:Boolean,
        //default:false,
    },
    canupdatestudent:{
        type:Boolean,
        //default:false,
    },
    canaddstudent:{
        type:Boolean,
        //default:false,
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