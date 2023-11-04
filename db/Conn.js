const mongoose = require('mongoose');

uri = "mongodb+srv://chiragsingh322:mkw4l66UvaMH7wva@myapi.5rrxdvq.mongodb.net/SMSDC?retryWrites=true&w=majority";

const connectDataBase = async () => {
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