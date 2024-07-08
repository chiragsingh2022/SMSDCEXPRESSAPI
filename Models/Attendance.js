const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
    },
    subjectId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Subject', 
       },
    date: { 
        type: Date, 
        default: Date.now 
    },
    isPresent: { 
        type: Boolean, 
        default: false 
    },
    
    session:String,
    semester:String,
    updated:Date,
    updatedBy:String,
    created: {
        type: Date,
        default: Date.now,
    },
    createdby: {
        type: String,
    },
});

module.exports = mongoose.model('Attendance', attendanceSchema);