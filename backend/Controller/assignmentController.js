const Assignment = require('../Model/Assignment');

const submitAssignmentResponse = async (req, res) => {
    try {
        const { id: assignmentId } = req.params;
        const { studentId, answers } = req.body;

        const assignment = await Assignment.findOne({ id: Number(assignmentId) });

        if (!assignment) {
            return res.status(404).json({
                message: "Assignment not found"
            });
        }

        // Check if past deadline
        if (new Date(assignment.dueDate) < new Date()) {
            return res.status(400).json({
                message: "Assignment deadline has passed"
            });
        }

        // Check if student already submitted
        const existingResponse = assignment.responses.find(
            response => response.studentId === Number(studentId)
        );

        if (existingResponse) {
            // Update existing response
            existingResponse.answers = answers.map((text, index) => ({
                questionIndex: index,
                text,
                submittedAt: new Date()
            }));
            existingResponse.status = 'Submitted';
        } else {
            // Add new response
            assignment.responses.push({
                studentId: Number(studentId),
                answers: answers.map((text, index) => ({
                    questionIndex: index,
                    text,
                    submittedAt: new Date()
                })),
                status: 'Submitted'
            });
        }

        // Update assignment status if needed
        if (assignment.status === 'Not Started') {
            assignment.status = 'Completed';
        }

        await assignment.save();
        res.status(200).json(assignment);
    } catch (error) {
        res.status(500).json({
            message: "Error submitting assignment response",
            error: error.message
        });
    }
};

// Get student's response for an assignment
const getStudentResponse = async (req, res) => {
    try {
        const { id: assignmentId } = req.params;
        const { studentId } = req.query;

        const assignment = await Assignment.findOne({ id: Number(assignmentId) });

        if (!assignment) {
            return res.status(404).json({
                message: "Assignment not found"
            });
        }

        const response = assignment.responses.find(
            response => response.studentId === Number(studentId)
        );

        res.status(200).json({ assignment, response });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching student response",
            error: error.message
        });
    }
};


// Get all assignments
const getAllAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find();
        res.status(200).json(assignments);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching assignments",
            error: error.message
        });
    }
};

// Get assignment by ID
const getAssignmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const assignment = await Assignment.findOne({ id: Number(id) });

        if (!assignment) {
            return res.status(404).json({
                message: "Assignment not found"
            });
        }

        res.status(200).json(assignment);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching assignment",
            error: error.message
        });
    }
};

// Optional: Get assignments by course ID
const getAssignmentsByCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const assignments = await Assignment.find({
            courseId: Number(courseId)
        });

        res.status(200).json(assignments);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching course assignments",
            error: error.message
        });
    }
};

const getStudentAssignments = async (req, res) => {
    try {
        const { studentId } = req.params;

        // First, get all assignments
        const assignments = await Assignment.find();

        // Format assignments without population
        const formattedAssignments = assignments.map(assignment => ({
            id: assignment.id,
            title: assignment.title,
            description: assignment.description,
            dueDate: assignment.dueDate,
            status: assignment.status,
            courseId: assignment.courseId,
            subjectId: assignment.subjectId,
            // Check student's response status
            studentStatus: assignment.responses.find(
                response => response.studentId === Number(studentId)
            )?.status || 'Not Started'
        }));

        // Get unique course and subject IDs
        const courseIds = [...new Set(assignments.map(a => a.courseId))];
        const subjectIds = [...new Set(assignments.map(a => a.subjectId))];

        // Fetch courses and subjects in bulk
        const courses = await Course.find({ id: { $in: courseIds } });
        const subjects = await Subject.find({ id: { $in: subjectIds } });

        // Create lookup maps
        const courseMap = new Map(courses.map(c => [c.id, c]));
        const subjectMap = new Map(subjects.map(s => [s.id, s]));

        // Add course and subject names to assignments
        const finalAssignments = formattedAssignments.map(assignment => ({
            ...assignment,
            courseName: courseMap.get(assignment.courseId)?.name || 'Unknown Course',
            subjectName: subjectMap.get(assignment.subjectId)?.name || 'Unknown Subject'
        }));

        res.status(200).json(finalAssignments);
    } catch (error) {
        console.error('Error in getStudentAssignments:', error);
        res.status(500).json({
            message: "Error fetching student assignments",
            error: error.message
        });
    }
};


const Course = require('../Model/CourseModel');
const Subject = require('../Model/Subject');



module.exports = {
    getAllAssignments,
    getAssignmentById,
    getAssignmentsByCourse,
    submitAssignmentResponse,
    getStudentResponse,
    getStudentAssignments
};