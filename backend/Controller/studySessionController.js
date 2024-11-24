const StudySession = require('../Model/StudySession');

const createStudySession = async (req, res) => {
    try {
        const { studentId, courseId, duration, date, notes } = req.body;
        const session = new StudySession({
            studentId: Number(studentId),
            courseId: Number(courseId),
            duration,
            date,
            notes
        });

        await session.save();
        res.status(201).json(session);
    } catch (error) {
        res.status(500).json({
            message: "Error creating study session",
            error: error.message
        });
    }
};

const getStudentSessions = async (req, res) => {
    try {
        const { studentId } = req.params;
        const sessions = await StudySession.find({
            studentId: Number(studentId)
        }).sort({ date: -1 });

        res.status(200).json(sessions);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching study sessions",
            error: error.message
        });
    }
};

module.exports = {
    createStudySession,
    getStudentSessions
};