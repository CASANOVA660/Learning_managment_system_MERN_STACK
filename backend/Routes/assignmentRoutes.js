const express = require('express');
const router = express.Router();
const {
    getAllAssignments,
    getAssignmentById,
    getAssignmentsByCourse,
    submitAssignmentResponse,
    getStudentResponse,
    getStudentAssignments, addAssignment
} = require('../Controller/assignmentController');

// Get all assignments
router.get('/', getAllAssignments);

// Get assignment by ID
router.get('/:id', getAssignmentById);

// Get assignments by course ID
router.get('/course/:courseId', getAssignmentsByCourse);
router.post('/:id/submit', submitAssignmentResponse);

// Get student's response
router.get('/:id/response', getStudentResponse);

router.get('/student/:studentId', getStudentAssignments);
router.post('/addassignments', addAssignment);

module.exports = router;