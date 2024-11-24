const Achievement = require('../Model/Achievement');
const UserAchievement = require('../Model/UserAchievement');

// Get all available achievements
const getAllAchievements = async (req, res) => {
    try {
        const achievements = await Achievement.find().sort({ category: 1, target: 1 });
        res.status(200).json(achievements);
    } catch (error) {
        console.error('Error in getAllAchievements:', error);
        res.status(500).json({
            message: "Error fetching achievements",
            error: error.message
        });
    }
};

// Get achievements for a specific student
const getStudentAchievements = async (req, res) => {
    try {
        const { studentId } = req.params;

        // Validate studentId
        if (!studentId) {
            return res.status(400).json({ message: "Student ID is required" });
        }

        // Get user's achievements with progress
        const userAchievements = await UserAchievement.find({
            studentId: Number(studentId)
        });

        // Get all achievements for reference
        const allAchievements = await Achievement.find();

        // Combine user achievements with achievement details
        const detailedAchievements = allAchievements.map(achievement => {
            const userProgress = userAchievements.find(
                ua => ua.achievementId === achievement.id
            ) || {
                progress: 0,
                completed: false
            };

            return {
                ...achievement.toObject(),
                progress: userProgress.progress,
                completed: userProgress.completed,
                earnedAt: userProgress.earnedAt
            };
        });

        res.status(200).json(detailedAchievements);
    } catch (error) {
        console.error('Error in getStudentAchievements:', error);
        res.status(500).json({
            message: "Error fetching student achievements",
            error: error.message
        });
    }
};

// Update achievement progress
const updateAchievementProgress = async (req, res) => {
    try {
        const { studentId, achievementId, progress } = req.body;

        // Validate required fields
        if (!studentId || !achievementId || progress === undefined) {
            return res.status(400).json({
                message: "StudentId, achievementId, and progress are required"
            });
        }

        // Find or create user achievement record
        let userAchievement = await UserAchievement.findOne({
            studentId: Number(studentId),
            achievementId: Number(achievementId)
        });

        const achievement = await Achievement.findOne({ id: Number(achievementId) });

        if (!achievement) {
            return res.status(404).json({ message: "Achievement not found" });
        }

        if (!userAchievement) {
            userAchievement = new UserAchievement({
                studentId: Number(studentId),
                achievementId: Number(achievementId),
                progress: 0
            });
        }

        // Update progress
        userAchievement.progress = progress;

        // Check if achievement is completed
        if (progress >= achievement.target && !userAchievement.completed) {
            userAchievement.completed = true;
            userAchievement.earnedAt = new Date();
        }

        await userAchievement.save();
        res.status(200).json(userAchievement);
    } catch (error) {
        console.error('Error in updateAchievementProgress:', error);
        res.status(500).json({
            message: "Error updating achievement progress",
            error: error.message
        });
    }
};

// Check and update achievements based on actions
const checkAchievements = async (studentId, action, value = 1) => {
    try {
        if (!studentId || !action) {
            console.error('Missing required parameters in checkAchievements');
            return;
        }

        // Get achievements for the specific action
        const achievements = await Achievement.find({ category: action });

        for (const achievement of achievements) {
            let userAchievement = await UserAchievement.findOne({
                studentId: Number(studentId),
                achievementId: achievement.id
            });

            // Create new user achievement if it doesn't exist
            if (!userAchievement) {
                userAchievement = new UserAchievement({
                    studentId: Number(studentId),
                    achievementId: achievement.id,
                    progress: 0
                });
            }

            // Update progress based on action type
            switch (action) {
                case 'ASSIGNMENT':
                    // For assignment completion
                    userAchievement.progress += 1;
                    break;

                case 'STUDY':
                    // For study time (value in minutes)
                    userAchievement.progress = value;
                    break;

                case 'STREAK':
                    // For login streaks
                    userAchievement.progress = value;
                    break;

                case 'QUIZ':
                    // For quiz scores
                    if (value === 100) {
                        userAchievement.progress += 1;
                    }
                    break;

                case 'COURSE':
                    // For course completion
                    userAchievement.progress += 1;
                    break;

                default:
                    console.warn(`Unknown achievement action type: ${action}`);
                    continue;
            }

            // Check if achievement is completed
            if (userAchievement.progress >= achievement.target && !userAchievement.completed) {
                userAchievement.completed = true;
                userAchievement.earnedAt = new Date();

                // You could emit an event or notification here
                console.log(`Achievement unlocked: ${achievement.title} for student ${studentId}`);
            }

            await userAchievement.save();
        }
    } catch (error) {
        console.error('Error in checkAchievements:', error);
    }
};

// Get achievement statistics for a student
const getAchievementStats = async (req, res) => {
    try {
        const { studentId } = req.params;

        const userAchievements = await UserAchievement.find({
            studentId: Number(studentId),
            completed: true
        });

        const stats = {
            totalEarned: userAchievements.length,
            recentlyEarned: userAchievements
                .sort((a, b) => b.earnedAt - a.earnedAt)
                .slice(0, 5),
            categoryProgress: {}
        };

        res.status(200).json(stats);
    } catch (error) {
        console.error('Error in getAchievementStats:', error);
        res.status(500).json({
            message: "Error fetching achievement statistics",
            error: error.message
        });
    }
};

module.exports = {
    getAllAchievements,
    getStudentAchievements,
    updateAchievementProgress,
    checkAchievements,
    getAchievementStats
};