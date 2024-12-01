const express = require("express");
const router = express.Router();
const Course = require('../Model/CourseModel');
const Teacher = require('../Model/TeacherModel');
const Class = require('../Model/ClassModel');
const mongoose = require('mongoose');

// Get all teachers
exports.getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find();
        const populatedTeachers = await Promise.all(teachers.map(async (teacher) => {
            const courses = await Course.find({ id: { $in: teacher.courses } });
            return { ...teacher._doc, courses };
        }));
        res.status(200).json(populatedTeachers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getTeacherById = async (req, res) => {
    try {
        const teacherId = req.params.id; // Get the ID directly from the request parameters
        console.log("Fetching teacher with ID:", teacherId); // Log the ID being fetched

        // Use findById to fetch the teacher using the ObjectId
        const teacher = await Teacher.findById(teacherId).lean();

        if (!teacher) {
            console.log("Teacher not found for ID:", teacherId); // Log if teacher is not found
            return res.status(404).json({ message: "Teacher not found" });
        }

        // Fetch the courses for the teacher (if any)
        const courses = await Course.find({ _id: { $in: teacher.courses } });

        // Log the fetched teacher and their courses
        console.log("Fetched Teacher Data:", teacher);
        console.log("Courses for Teacher:", courses);

        // Return the teacher data along with courses
        res.status(200).json({ ...teacher, courses });
    } catch (error) {
        console.error("Error fetching teacher by ID:", error.message);
        res.status(500).json({ message: error.message });
    }
};








// ... existing code ...

// Get subjects for a specific teacher
// Get subjects for a specific teacher
exports.getTeacherSubjects = async (req, res) => {
    try {
        const teacherId = parseInt(req.params.teacherId);
        const teacher = await Teacher.findOne({ id: teacherId });

        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        // Log the teacher's subjects
        console.log("Teacher's subjects:", teacher.subjects);

        // Fetch classes that have this teacher as the main teacher
        const classes = await Class.find({ mainTeacher: teacher._id }).populate('subjects');

        // Log the classes fetched
        console.log("Classes for teacher:", classes);

        // Extract subjects from classes
        const subjects = classes.map(classItem => ({
            className: classItem.name,
            subjects: classItem.subjects
        }));

        // Log the subjects extracted
        console.log("Extracted subjects:", subjects);

        if (subjects.length === 0) {
            return res.status(404).json({ message: 'No subjects found for this teacher.' });
        }

        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};