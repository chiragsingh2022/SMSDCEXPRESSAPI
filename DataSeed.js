const connectDB = require('./db/Conn');

const DataSeed = require('./Models/Rss');

const studentJson = require('./jahangirpur.json');

const start = async () => {
    try {
        await connectDB();
        //await DataSeed.collection.drop()
        await DataSeed.create(studentJson);
        console.log("data seeded")
    }
    catch (error) {
        console.log(error);
    }
}
start();