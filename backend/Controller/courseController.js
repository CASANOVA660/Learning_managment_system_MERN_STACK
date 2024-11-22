const express = require("express");
const router = express.Router();
const Course = require('../Model/CourseModel');
const Teacher = require('../Model/TeacherModel');

// Get all courses
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        const populatedCourses = await Promise.all(courses.map(async (course) => {
            const instructor = await Teacher.findOne({ id: course.instructor });
            return { ...course._doc, instructor };
        }));
        res.status(200).json(populatedCourses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
