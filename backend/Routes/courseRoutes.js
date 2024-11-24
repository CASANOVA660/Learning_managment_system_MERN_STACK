const express = require("express");
const router = express.Router();
const { getAllCourses, getCourseById } = require("../Controller/courseController");

// Get all courses
router.get("/", getAllCourses);

// Get course by ID
router.get("/:id", getCourseById);

module.exports = router;