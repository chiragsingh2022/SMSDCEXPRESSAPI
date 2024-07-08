const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    session:String,
    created: {
        type: Date,
        default: Date.now,
    },
    createdby: {
        type: String
    }
});

module.exports = mongoose.model('Session',sessionSchema);