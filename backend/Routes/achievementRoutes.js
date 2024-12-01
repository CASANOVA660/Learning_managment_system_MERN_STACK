const express = require('express');
const router = express.Router();
const {
    getAllAchievements,
    getStudentAchievements,
    updateAchievementProgress,
    getAchievementStats
} = require('../Controller/achievementController');

// Get all achievements
router.get('/', getAllAchievements);

// Get achievements for a specific student
router.get('/student/:studentId', getStudentAchievements);

// Get achievement statistics for a student
router.get('/stats/:studentId', getAchievementStats);

// Update achievement progress
router.post('/progress', updateAchievementProgress);

module.exports = router;