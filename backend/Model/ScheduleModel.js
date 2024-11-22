const mongoose = require('mongoose');

const customClassSchema = new mongoose.Schema({
    title: String,
    taskName: String,
    description: String,
    time: String,
    colorCode: String,
    isPrivate: {
        type: Boolean,
        default: true
    },
    isCustom: {
        type: Boolean,
        default: true
    }
});

const classSchema = new mongoose.Schema({
    subject: String,
    location: String,
    city: String,
    time: String,
    instructor: String
});

const scheduleSchema = new mongoose.Schema({
    studentId: {
        type: Number,
        required: true,
        ref: 'Student'
    },
    calendarWeek: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    days: [{
        day: String,  // "MON", "TUE", etc.
        date: Date,   // Actual date for this day
        classes: [classSchema],
        customClasses: [customClassSchema]
    }]
});

const Schedule = mongoose.model('Schedule', scheduleSchema);
module.exports = Schedule;