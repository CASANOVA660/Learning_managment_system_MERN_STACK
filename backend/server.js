const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const router = express.Router();

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
app.use("/course", subjectRouter)

const scheduleRouter = require("./Routes/scheduleRoutes");
app.use("/schedule", scheduleRouter);

mongoose.connect(process.env.DBURI);

const db = mongoose.connection;
db.on("error", (error) => {
    console.error("MongoDB connection error:", error);
});

db.once("open", () => {
    console.log("Connected to MongoDB");
});

const server = app.listen(process.env.PORT, () => {
    console.log(`server started on port ${process.env.PORT}`);
});

