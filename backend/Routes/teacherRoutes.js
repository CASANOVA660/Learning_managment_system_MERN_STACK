const express = require("express");
const router = express.Router();
const teacherController = require("../Controller/teacherController");

// Get all teachers
router.get("/", teacherController.getAllTeachers);

// Get teacher by ID
router.get("/:id", teacherController.getTeacherById);

// Get subjects for a specific teacher
router.get("/:teacherId/subjects", teacherController.getTeacherSubjects);

module.exports = router;