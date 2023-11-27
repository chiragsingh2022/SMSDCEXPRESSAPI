const mongoose = require('mongoose');
const validator = require('validator');

const studentSchema = new mongoose.Schema({
    studentid: {
        type: String,
        required: [true, "Roll Number is required"],
        unique: [true, "Roll Number should be unique"]
    },
    fname: {
        type: String,
        required: [true, "First Name must be entered"]
    },
    mname: {
        type: String
    },
    lname: {
        type: String
    },
    dob: {
        type: Date,
        required: [true, "DOB must be entered"]
    },
    gender: {
        type: String,
        required: [true, "Gender must be entered"]
    },
    email: {
        type: String,
        unique: [true, "Email must be unique"],
        validate:{
            validator: validator.isEmail,
            message:'Invalid email format',
        }
    },
    phonenumber: {
        type: Number,
        minLength: 10,
        maxLength: 10,
        required: [true, "Phone Number must be entered"]
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String
    },
    image:String,
    // image: {
    //     data: Buffer, // Image data will be stored as Buffer
    //     contentType: String // Mime type of the image (e.g., 'image/jpeg', 'image/png', etc.)
    // },
    // attendance: [
    //     {
    //         date: {
    //             type: Date,
                
    //         },
    //         status: {
    //             type: String,
    //             enum: ['present', 'absent', 'late'],
               
    //         },
    //         attendancestatus:{
    //             type:Boolean,
    //             default:false,
    //         }
    //     }
    // ],
    
    created: {
        type: Date,
        default: Date.now,
    },
    createdby: {
        type: String
    }
})

module.exports = mongoose.model('Student', studentSchema);