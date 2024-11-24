const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    courses: [{
        type: Number,  // Changed to Number to match course IDs
        required: true,
    }],
    image: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Subject", SubjectSchema);