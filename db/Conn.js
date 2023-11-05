const mongoose = require('mongoose');

const connectDataBase = async (uri) => {
    try {
        const connectDb = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        if (connectDb) {
            console.log("Database Connected Successfully");
            return connectDb;
        }
    }
    catch (e) {
        console.log(e);
    }
}

module.exports = connectDataBase;