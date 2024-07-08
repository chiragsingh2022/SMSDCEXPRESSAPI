require("dotenv").config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const studentRoute = require("./Routes/StudentRoute");
const attendanceRoute = require('./Routes/AttendanceRoute');
const attachmentRoute = require('./Routes/FileAttachmentRoute');
const userRoute = require('./Routes/UserRoute');
const loginRoute = require('./Routes/LoginRoute');
const rssRoute = require('./Routes/RssRoute');
const teacherRoute = require('./Routes/TeacherRoute');
const masterRoute = require('./Routes/MasterRoute');
const connectDataBase = require('./db/Conn');
const cors = require('cors');

// const corsOptions = {
//     origin: "http://localhost:3000"
// }

app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use("/api/student",studentRoute)
app.use("/api/attendance",attendanceRoute)
app.use("/api/attachment",attachmentRoute)
app.use("/api/user",userRoute)
app.use("/api/login",loginRoute)
app.use("/api/rss",rssRoute)
app.use("/api/teacher",teacherRoute)
app.use("/api/master",masterRoute)

const start = async () =>{
    try {
        await connectDataBase(process.env.MONGODB_URL);
        app.listen(port, () => {
            console.log(`app is listening port ${port}`);
        })
    } catch (e) {
        console.log(e);
    }
}
start();