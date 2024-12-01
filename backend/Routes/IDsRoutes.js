const express = require('express');
const router = express.Router();
const IDAggregatorController = require('../Controller/IDAggregatorController');

// Routes for fetching IDs by ID
router.get('/assignments/:id', IDAggregatorController.getAssignmentById);
router.get('/classes/:id', IDAggregatorController.getClassById);
router.get('/courses/:id', IDAggregatorController.getCourseById);
router.get('/students/:id', IDAggregatorController.getStudentById);
router.get('/teachers/:id', IDAggregatorController.getTeacherById);
router.get('/subjects/:id', IDAggregatorController.getSubjectById);
router.get('/clubs/:id', IDAggregatorController.getClubById);
router.get('/achievements/:id', IDAggregatorController.getAchievementById);
router.get('/study-sessions/:id', IDAggregatorController.getStudySessionById);

module.exports = router;