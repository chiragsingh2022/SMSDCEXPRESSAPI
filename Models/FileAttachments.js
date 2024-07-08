const mongoose = require('mongoose');

const attachmentSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
    },
    fileType: {
        type: String,
    },
    fileMimeType: {
        type: String,
    },
    data: {
        type: Buffer, // Use Buffer or Uint8Array for binary data
    },
    fileName:{
        type:String,
    },
    fieldname:{
        type:String,
    },
    created: {
        type: Date,
        default: Date.now,
    },
    createdby: {
        type: String,
    },
});

module.exports = mongoose.model('Attachment', attachmentSchema); // Changed the model name to 'Attachment'
