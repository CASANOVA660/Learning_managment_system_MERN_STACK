const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    instructor: {
        type: Number,  // Reference to the id field in Teacher model
        required: true
    },
    progress: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    enrolled: {
        type: String,
        required: true
    },
    credits: {
        type: Number,
        required: true
    },
    nextClass: {
        type: Date,
        required: true
    }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
