const mongoose = require('mongoose');


const gradeSchema = new mongoose.Schema({
    subject: String,
    grade: Number,
    maxGrade: Number
});

const attendanceSchema = new mongoose.Schema({
    date: Date,
    status: String, // "present", "absent", "excused"
    subject: String
});

const courseProgressSchema = new mongoose.Schema({
    courseName: String,
    completedModules: Number,
    totalModules: Number,
    progress: Number
});

const achievementSchema = new mongoose.Schema({
    title: String,
    points: Number,
    date: Date,
    description: String
});

const assignmentSchema = new mongoose.Schema({
    title: String,
    subject: String,
    dueDate: Date,
    status: String,
    priority: String
});

const studyTimeSchema = new mongoose.Schema({
    date: Date,
    subject: String,
    duration: Number, // in minutes
    goal: Number
});

const dashboardSchema = new mongoose.Schema({
    studentId: {
        type: Number,
        required: true,
        ref: 'Student'
    },
    grades: [gradeSchema],
    attendance: [attendanceSchema],
    courseProgress: [courseProgressSchema],
    achievements: [achievementSchema],
    upcomingAssignments: [assignmentSchema],
    studyTime: [studyTimeSchema],
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

const Dashboard = mongoose.model('Dashboard', dashboardSchema);
module.exports = Dashboard;