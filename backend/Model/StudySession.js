const mongoose = require('mongoose');

const StudySessionSchema = new mongoose.Schema({
    studentId: {
        type: Number,
        required: true,
        ref: 'Student'
    },
    courseId: {
        type: Number,
        required: true,
        ref: 'Course'
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    duration: {
        type: Number, // in minutes
        required: true
    },
    notes: {
        type: String
    }
});

const StudySession = mongoose.model('StudySession', StudySessionSchema);

module.exports = StudySession;