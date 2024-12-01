const { checkAchievements } = require('./achievementController');

const achievementTriggers = {
    // Assignment-related triggers
    async onAssignmentComplete(studentId, grade) {
        // Track completed assignment
        await checkAchievements(studentId, 'ASSIGNMENT');

        // Check for perfect score
        if (grade === 100) {
            await checkAchievements(studentId, 'QUIZ', 100);
        }
    },

    // Study time triggers
    async onStudySessionComplete(studentId, duration) {
        await checkAchievements(studentId, 'STUDY', duration);
    },

    // Login streak triggers
    async onStudentLogin(studentId, streakDays) {
        await checkAchievements(studentId, 'STREAK', streakDays);
    },

    // Course completion triggers
    async onCourseComplete(studentId) {
        await checkAchievements(studentId, 'COURSE');
    },

    // Subject mastery triggers
    async onSubjectProgress(studentId, progress) {
        if (progress === 100) {
            await checkAchievements(studentId, 'SUBJECT_MASTERY');
        }
    }
};

module.exports = achievementTriggers;