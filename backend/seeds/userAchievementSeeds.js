const mongoose = require('mongoose');
require('dotenv').config();
const UserAchievement = require('../Model/UserAchievement');
const { achievements } = require('./achievementSeeds');

// Sample student IDs - replace these with actual student IDs from your database
const sampleStudentIds = [14, 15, 16];

// Generate sample user achievements
const generateUserAchievements = () => {
    const userAchievements = [];

    sampleStudentIds.forEach(studentId => {
        // For each achievement, create a user achievement record
        achievements.forEach(achievement => {
            // Randomly determine if the achievement is completed
            const isCompleted = Math.random() > 0.7;
            const progress = isCompleted
                ? achievement.target
                : Math.floor(Math.random() * achievement.target);

            userAchievements.push({
                studentId: studentId,
                achievementId: achievement.id,
                progress: progress,
                completed: isCompleted,
                earnedAt: isCompleted ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) : null
            });
        });
    });

    return userAchievements;
};

// Create some completed achievements for demonstration
const createCompletedAchievements = (studentId) => {
    return [
        {
            studentId: studentId,
            achievementId: 1, // "First Steps"
            progress: 1,
            completed: true,
            earnedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000) // 20 days ago
        },
        {
            studentId: studentId,
            achievementId: 4, // "Study Beginner"
            progress: 60,
            completed: true,
            earnedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) // 15 days ago
        },
        {
            studentId: studentId,
            achievementId: 7, // "Getting Started"
            progress: 3,
            completed: true,
            earnedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) // 10 days ago
        }
    ];
};

// Create some in-progress achievements
const createInProgressAchievements = (studentId) => {
    return [
        {
            studentId: studentId,
            achievementId: 2, // "Assignment Master"
            progress: 7, // 7/10 assignments completed
            completed: false,
            earnedAt: null
        },
        {
            studentId: studentId,
            achievementId: 5, // "Study Expert"
            progress: 400, // 400/600 minutes studied
            completed: false,
            earnedAt: null
        },
        {
            studentId: studentId,
            achievementId: 8, // "Consistent Learner"
            progress: 5, // 5/7 days streak
            completed: false,
            earnedAt: null
        }
    ];
};

async function seedUserAchievements() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.DBURI);
        console.log('Connected to MongoDB');

        // Clear existing user achievements
        await UserAchievement.deleteMany({});
        console.log('Cleared existing user achievements');

        // Generate random achievements for all sample students
        const randomAchievements = generateUserAchievements();

        // Create specific achievements for the first student
        const completedAchievements = createCompletedAchievements(sampleStudentIds[0]);
        const inProgressAchievements = createInProgressAchievements(sampleStudentIds[0]);

        // Combine all achievements
        const allUserAchievements = [
            ...randomAchievements,
            ...completedAchievements,
            ...inProgressAchievements
        ];

        // Insert all achievements
        await UserAchievement.insertMany(allUserAchievements);
        console.log('Successfully seeded user achievements');

        // Log some statistics
        const stats = {
            totalRecords: allUserAchievements.length,
            completedAchievements: allUserAchievements.filter(a => a.completed).length,
            inProgressAchievements: allUserAchievements.filter(a => !a.completed).length
        };
        console.log('Seeding statistics:', stats);

        // Disconnect from MongoDB
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');

    } catch (error) {
        console.error('Error seeding user achievements:', error);
        process.exit(1);
    }
}

// Run the seed function if this file is run directly
if (require.main === module) {
    seedUserAchievements();
}

module.exports = {
    seedUserAchievements
};