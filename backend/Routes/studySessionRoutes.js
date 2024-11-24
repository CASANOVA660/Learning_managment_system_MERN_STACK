const express = require('express');
const router = express.Router();
const {
    createStudySession,
    getStudentSessions
} = require('../Controller/studySessionController');

router.post('/', createStudySession);
router.get('/student/:studentId', getStudentSessions);

module.exports = router;