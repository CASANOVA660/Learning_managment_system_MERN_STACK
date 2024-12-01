const mongoose = require('mongoose');

const IDAggregatorSchema = new mongoose.Schema({
    assignmentIds: [{
        type: Number,
        ref: 'Assignment'
    }],
    classIds: [{
        type: Number,
        ref: 'Class'
    }],
    courseIds: [{
        type: Number,
        ref: 'Course'
    }],
    studentIds: [{
        type: Number,
        ref: 'Student'
    }],
    teacherIds: [{
        type: Number,
        ref: 'Teacher'
    }],
    subjectIds: [{
        type: Number,
        ref: 'Subject'
    }],
    clubIds: [{
        type: Number,
        ref: 'Club'
    }],
    achievementIds: [{
        type: Number,
        ref: 'Achievement'
    }],
    studySessionIds: [{
        type: Number,
        ref: 'StudySession'
    }]
});

const IDAggregator = mongoose.model('IDAggregator', IDAggregatorSchema);

module.exports = IDAggregator; 