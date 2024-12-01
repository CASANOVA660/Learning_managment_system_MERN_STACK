const express = require('express');
const router = express.Router();
const {
    getAllClasses,
    getClassById,
    getClassSubjects,
    getClassStudents,
    addClass

} = require('../Controller/classController');

router.get('/', getAllClasses);
router.get('/:id', getClassById);
router.get('/:id/subjects', getClassSubjects);
router.get('/:id/students', getClassStudents);
router.post('/', addClass);
module.exports = router;