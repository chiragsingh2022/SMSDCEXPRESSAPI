const mongoose = require('mongoose');
const validator = require('validator');

const teacherSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is required'],
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is required'],
    },
    email: {
        type: String,
        unique: [true, 'Email must be unique'],
        required: [true, 'Email is required'],
        validate: {
            validator: validator.isEmail,
            message: 'Invalid email format',
        },
    },
    phoneNumber: {
        type: String,
        minLength: 10,
        maxLength: 10,
        required: [true, 'Phone Number is required'],
    },
    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
    }],
    address: {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String,
    },
    dob: {
        type: Date,
        required: [true, "DOB must be entered"]
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
    },
    aadharNumber:String,
    qualification: String,
    experience: String,
    joinDate: {
        type: Date,
    },

    created: {
        type: Date,
        default: Date.now,
    },
    createdby: {
        type: String,
    },
});

module.exports = mongoose.model('Teacher', teacherSchema);
