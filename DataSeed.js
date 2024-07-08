require("dotenv").config();
const connectDB = require('./db/Conn');

const Rss = require('./Models/Rss');
const Subject = require('./Models/Subject');

const studentJson = require('./jahangirpur.json');
const subjectJson = require('./subject.json');
const teacherJson = require('./teacher.json');
const Teacher = require("./Models/Teacher");

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        await Teacher.collection.drop()
        await Teacher.create(teacherJson);
        console.log("data seeded")
    }
    catch (error) {
        console.log(error);
    }
}
start();