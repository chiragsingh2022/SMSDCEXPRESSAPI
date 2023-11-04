const mongoose = require('mongoose');

const rssSchema = new mongoose.Schema({
    voterno:{
        type:String
    },
    villageno:{
        type:String
    },
    votersname:{
        type:String
    },
    fathersname:{
        type:String
    },
    category:{
        type:String
    },
    address:{
        type:String
    },
})

module.exports = mongoose.model('Rss',rssSchema);