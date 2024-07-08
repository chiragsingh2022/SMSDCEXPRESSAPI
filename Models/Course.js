const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({

    course:String,

    created: {
        type: Date,
        default: Date.now,
    },
    
    createdby: {
        type: String
    }
});

module.exports = mongoose.model('Course',courseSchema);