const mongoose = require('mongoose');

const UserAchievementSchema = new mongoose.Schema({
    studentId: {
        type: Number,
        required: true
    },
    achievementId: {
        type: Number,
        required: true
    },
    progress: {
        type: Number,
        default: 0
    },
    completed: {
        type: Boolean,
        default: false
    },
    earnedAt: Date
});

const UserAchievement = mongoose.model('UserAchievement', UserAchievementSchema);

module.exports = UserAchievement;