const mongoose = require('mongoose');
require('dotenv').config();
const Achievement = require('../Model/Achievement');

const achievements = [
    // Assignment Achievements
    {
        id: 1,
        title: "First Steps",
        description: "Complete your first assignment",
        category: "ASSIGNMENT",
        icon: "🎯",
        target: 1,
        points: 10
    },
    {
        id: 2,
        title: "Assignment Master",
        description: "Complete 10 assignments",
        category: "ASSIGNMENT",
        icon: "📚",
        target: 10,
        points: 50
    },
    {
        id: 3,
        title: "Assignment Champion",
        description: "Complete 25 assignments",
        category: "ASSIGNMENT",
        icon: "🏆",
        target: 25,
        points: 100
    },

    // Study Time Achievements
    {
        id: 4,
        title: "Study Beginner",
        description: "Study for a total of 1 hour",
        category: "STUDY",
        icon: "⏱️",
        target: 60, // minutes
        points: 20
    },
    {
        id: 5,
        title: "Study Expert",
        description: "Study for a total of 10 hours",
        category: "STUDY",
        icon: "📖",
        target: 600, // minutes
        points: 100
    },
    {
        id: 6,
        title: "Study Master",
        description: "Study for a total of 24 hours",
        category: "STUDY",
        icon: "🎓",
        target: 1440, // minutes
        points: 200
    },

    // Streak Achievements
    {
        id: 7,
        title: "Getting Started",
        description: "Login for 3 consecutive days",
        category: "STREAK",
        icon: "🔥",
        target: 3,
        points: 30
    },
    {
        id: 8,
        title: "Consistent Learner",
        description: "Login for 7 consecutive days",
        category: "STREAK",
        icon: "🌟",
        target: 7,
        points: 70
    },
    {
        id: 9,
        title: "Dedication Master",
        description: "Login for 30 consecutive days",
        category: "STREAK",
        icon: "💫",
        target: 30,
        points: 300
    },

    // Quiz Achievements
    {
        id: 10,
        title: "Perfect Score",
        description: "Get 100% on any assignment",
        category: "QUIZ",
        icon: "⭐",
        target: 1,
        points: 50
    },
    {
        id: 11,
        title: "Quiz Master",
        description: "Get 5 perfect scores",
        category: "QUIZ",
        icon: "🌠",
        target: 5,
        points: 150
    },

    // Course Achievements
    {
        id: 12,
        title: "Course Pioneer",
        description: "Complete your first course",
        category: "COURSE",
        icon: "🚀",
        target: 1,
        points: 100
    },
    {
        id: 13,
        title: "Course Expert",
        description: "Complete 5 courses",
        category: "COURSE",
        icon: "🎯",
        target: 5,
        points: 300
    },

    // Subject Mastery Achievements
    {
        id: 14,
        title: "Subject Explorer",
        description: "Reach 100% progress in any subject",
        category: "SUBJECT_MASTERY",
        icon: "🗺️",
        target: 1,
        points: 150
    },
    {
        id: 15,
        title: "Subject Master",
        description: "Reach 100% progress in 3 subjects",
        category: "SUBJECT_MASTERY",
        icon: "👑",
        target: 3,
        points: 400
    }
];

async function seedAchievements() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.DBURI);
        console.log('Connected to MongoDB');

        // Clear existing achievements
        await Achievement.deleteMany({});
        console.log('Cleared existing achievements');

        // Insert new achievements
        await Achievement.insertMany(achievements);
        console.log('Successfully seeded achievements');

        // Disconnect from MongoDB
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');

    } catch (error) {
        console.error('Error seeding achievements:', error);
        process.exit(1);
    }
};


// Run the seed function
seedAchievements();