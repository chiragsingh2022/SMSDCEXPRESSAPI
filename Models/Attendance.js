const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    studentid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
    },
    date: {
        type: Date,
    },
    status: {
        type: String,
    },
    mark: {
        type: Boolean,
    },
    created: {
        type: Date,
        default: Date.now,
    },
    createdby: {
        type: String,
    },
});

module.exports = mongoose.model('Attendance',attendanceSchema);