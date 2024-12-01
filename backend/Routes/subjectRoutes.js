const express = require("express");
const router = express.Router();
const { getAllSubjects, getSubjectById, getSubjectsForClass, addSubject, assignTeacherToSubject } = require("../Controller/subjectController");

// Get all subjects
router.get("/", getAllSubjects);

// Get subject by ID
router.get("/:id", getSubjectById);
router.get("/class/:classId/subjects", getSubjectsForClass);
router.post("/addsubjects", addSubject);
router.put('/:subjectId/assign-teacher', assignTeacherToSubject);

module.exports = router;