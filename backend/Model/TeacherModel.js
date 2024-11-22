const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    department: {
        type: String,
        required: true
    },
    courses: [{
        type: Number
    }]
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
