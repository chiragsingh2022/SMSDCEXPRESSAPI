const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const studentroute = require("./Routes/StudentRoute");
const userroute = require('./Routes/UserRoute');
const loginroute = require('./Routes/LoginRoute');
const rssroute = require('./Routes/RssRoute');
const connectDataBase = require('./db/Conn');
const cors = require('cors');
const { jwt, jwtKey } = require('./Controllers/Jwt');

const corsOptions = {
    origin: "http://localhost:3000"
}

app.use(cors());
app.use(express.json());
app.use("/api/student",studentroute)
app.use("/api/user",userroute)
app.use("/api/login",loginroute)
app.use("/api/rss",rssroute)

const start = async () =>{
    try {
        await connectDataBase();
        app.listen(port, () => {
            console.log(`app is listening port ${port}`);
        })
    } catch (e) {
        console.log(e);
    }
}
start();