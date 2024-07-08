const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({

    code:String,
    description:String,

    created: {
        type: Date,
        default: Date.now,
    },
    
    createdby: {
        type: String
    }
});

module.exports = mongoose.model('Subject',subjectSchema);