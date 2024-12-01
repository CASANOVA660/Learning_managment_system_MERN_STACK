const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    academicYear: {
        type: String,
        required: true
    },
    department: {
        type: mongoose.Schema.Types.ObjectId, // Reference to Department model
        ref: 'Department',
        required: true
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId, // Reference to Student model
        ref: 'Student'
    }],
    subjects: [{
        type: mongoose.Schema.Types.ObjectId, // Reference to Subject model
        ref: 'Subject'
    }],
    capacity: {
        type: Number,
        required: true
    },
    schedule: [{
        day: String,
        timeSlots: [{
            startTime: String,
            endTime: String,
            subject: {
                type: mongoose.Schema.Types.ObjectId, // Reference to Subject model
                ref: 'Subject'
            }
        }]
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },

});

module.exports = mongoose.model('Class', classSchema);