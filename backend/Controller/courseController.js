const express = require("express");
const router = express.Router();
const Course = require('../Model/CourseModel');
const Teacher = require('../Model/TeacherModel');

// Get all courses
exports.getAllCourses = async (req, res) => {
    try {
        // Find all courses and populate the instructor field
        const courses = await Course.find().lean();

        // Get all unique instructor IDs
        const instructorIds = [...new Set(courses.map(course => course.instructor))];

        // Fetch all required teachers in one query
        const teachers = await Teacher.find({ id: { $in: instructorIds } }).lean();

        // Create a map of teachers for quick lookup
        const teacherMap = teachers.reduce((map, teacher) => {
            map[teacher.id] = teacher;
            return map;
        }, {});

        // Combine course data with instructor data
        const populatedCourses = courses.map(course => ({
            ...course,
            instructor: teacherMap[course.instructor]
        }));

        res.status(200).json(populatedCourses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({
            message: "Error fetching courses",
            error: error.message
        });
    }
};

// Get course by ID with populated instructor details
exports.getCourseById = async (req, res) => {
    try {
        const courseId = parseInt(req.params.id);

        // Find the course
        const course = await Course.findOne({ id: courseId }).lean();

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Find the instructor
        const instructor = await Teacher.findOne({ id: course.instructor }).lean();

        if (!instructor) {
            return res.status(404).json({
                message: "Instructor not found for this course"
            });
        }

        // Combine course and instructor data
        const populatedCourse = {
            ...course,
            instructor
        };

        res.status(200).json(populatedCourse);
    } catch (error) {
        console.error('Error fetching course:', error);
        res.status(500).json({
            message: "Error fetching course",
            error: error.message
        });
    }
};
