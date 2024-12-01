const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const router = express.Router();
const http = require('http');
const server = http.createServer(app);



app.use(bodyParser.json());
const path = require("path");
const helmet = require("helmet");

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, world!');
});


const authRouter = require("./Routes/AuthRoutes");
app.use("/auth", authRouter);


const subjectRouter = require("./Routes/subjectRoutes")
app.use("/subjects", subjectRouter)

const scheduleRouter = require("./Routes/scheduleRoutes");
app.use("/schedule", scheduleRouter);

const courseRouter = require("./Routes/courseRoutes");
app.use("/chapters", courseRouter);

const assignmentRoutes = require('./routes/assignmentRoutes');
app.use('/assignments', assignmentRoutes);

const studySessionRoutes = require('./Routes/studySessionRoutes');
app.use('/study-sessions', studySessionRoutes);
mongoose.connect(process.env.DBURI);

const achievementRoutes = require('./Routes/achievementRoutes');
app.use('/achievements', achievementRoutes);

const clubRoutes = require('./Routes/clubRoutes');
app.use('/clubs', clubRoutes);

const classRoutes = require('./Routes/classRoutes');
app.use('/classes', classRoutes);

const teacherRoutes = require("./routes/teacherRoutes");
app.use("/teachers", teacherRoutes);

const idRoutes = require("./Routes/IDsRoutes");
app.use("/ids", idRoutes)

const departmentRoutes = require('./Routes/departementRoutes');
app.use('/departments', departmentRoutes);

const db = mongoose.connection;
db.on("error", (error) => {
    console.error("MongoDB connection error:", error);
});

db.once("open", () => {
    console.log("Connected to MongoDB");
});



const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});