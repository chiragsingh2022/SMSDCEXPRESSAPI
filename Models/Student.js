const mongoose = require('mongoose');
const validator = require('validator');

const studentSchema = new mongoose.Schema({
    admissionNumber: {
        type: String,
        required: [true, "Roll Number is required"],
        unique: [true, "Roll Number should be unique"]
    },
    firstName: {
        type: String,
        required: [true, "First Name must be entered"]
    },
    middleName: {
        type: String
    },
    lastName: {
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
    phoneNumber: {
        type: String,
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

    session: String,
    wrNumber: String,
    course: String,
    semester: String,
    enrollmentNumber: String,
    aadharNumber: String,
    fatherName: String,
    fatherIncome: String,
    fatherPhone: String,
    fatherOccupation: String,
    motherName: String,
    motherIncome: String,
    motherOccupation: String,
    motherPhone: String,
    zip: String,
    country: String,
    metricYear: String,
    metricStatus: String,
    metricRollNumber: String,
    metricBoard: String,
    metricTotalMarks: String,
    metricObtainedMarks: String,
    metricPercent: String,
    metricSchoolName: String,
    metricSubject: String,
    interBoard: String,
    interYear: String,
    interObtainedMark: String,
    interTotalMark: String,
    interPercent: String,
    interSchoolName: String,
    interStatus: String,
    interSubject: String,
    interRollNumber: String,
    graduationBoard: String,
    graduationCollegeName: String,
    graduationCourse: String,
    graduationObtainedMark: String,
    graduationPercent: String,
    graduationStatus: String,
    graduationTotalMark: String,
    graduationYear: String,
    graduationRollNumber: String,
    graduationSubject: String,
    
    created: {
        type: Date,
        default: Date.now,
    },
    createdby: {
        type: String
    },
    deleted: {
        type: Date,
    },
    deletedBy: {
        type: String
    },
    modified: {
        type: Date,
    },
    modifiedBy: {
        type: String
    },
})

module.exports = mongoose.model('Student', studentSchema);