const Assignment = require('../Model/Assignment');
const Class = require('../Model/ClassModel')
const Course = require('../Model/CourseModel');
const Student = require('../Model/StudentModel');
const Teacher = require('../Model/TeacherModel');
const Subject = require('../Model/Subject');
const Club = require('../Model/Club');
const Achievement = require('../Model/Achievement');
const StudySession = require('../Model/StudySession');

// Fetch Assignment ID by ID
exports.getAssignmentById = async (req, res) => {
    try {
        const assignment = await Assignment.findOne({ id: req.params.id });
        if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
        res.status(200).json(assignment);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving assignment', error });
    }
};

// Fetch Class ID by ID
exports.getClassById = async (req, res) => {
    try {
        const classData = await Class.findOne({ id: req.params.id });
        if (!classData) return res.status(404).json({ message: 'Class not found' });
        res.status(200).json(classData);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving class', error });
    }
};

// Fetch Course ID by ID
exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findOne({ id: req.params.id });
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving course', error });
    }
};

// Fetch Student ID by ID
exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findOne({ id: req.params.id });
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving student', error });
    }
};

// Fetch Teacher ID by ID
exports.getTeacherById = async (req, res) => {
    try {
        const teacher = await Teacher.findOne({ id: req.params.id });
        if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
        res.status(200).json(teacher);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving teacher', error });
    }
};

// Fetch Subject ID by ID
exports.getSubjectById = async (req, res) => {
    try {
        const subject = await Subject.findOne({ id: req.params.id });
        if (!subject) return res.status(404).json({ message: 'Subject not found' });
        res.status(200).json(subject);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving subject', error });
    }
};

// Fetch Club ID by ID
exports.getClubById = async (req, res) => {
    try {
        const club = await Club.findOne({ id: req.params.id });
        if (!club) return res.status(404).json({ message: 'Club not found' });
        res.status(200).json(club);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving club', error });
    }
};

// Fetch Achievement ID by ID
exports.getAchievementById = async (req, res) => {
    try {
        const achievement = await Achievement.findOne({ id: req.params.id });
        if (!achievement) return res.status(404).json({ message: 'Achievement not found' });
        res.status(200).json(achievement);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving achievement', error });
    }
};

// Fetch Study Session ID by ID
exports.getStudySessionById = async (req, res) => {
    try {
        const studySession = await StudySession.findOne({ id: req.params.id });
        if (!studySession) return res.status(404).json({ message: 'Study session not found' });
        res.status(200).json(studySession);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving study session', error });
    }
}; 