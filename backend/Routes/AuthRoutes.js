const express = require('express');
const router = express.Router();
const { RegisterStudent, RegisterTeacher, Login } = require('../Controller/authController');

router.post('/student/register', RegisterStudent);
router.post('/teacher/register', RegisterTeacher);
router.post('/login', Login);

module.exports = router;