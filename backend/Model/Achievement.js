const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['ASSIGNMENT', 'COURSE', 'STUDY', 'QUIZ', 'STREAK', 'SUBJECT_MASTERY'],
        required: true
    },
    icon: String,
    target: {
        type: Number,
        required: true
    },
    points: {
        type: Number,
        default: 0
    }
});

const Achievement = mongoose.model('Achievement', AchievementSchema);

module.exports = Achievement;