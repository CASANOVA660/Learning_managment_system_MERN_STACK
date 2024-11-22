const express = require("express");
const router = express.Router();
const Course = require('../Model/CourseModel');
const Teacher = require('../Model/TeacherModel');

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

// Get teacher by ID
exports.getTeacherById = async (req, res) => {
    try {
        const teacher = await Teacher.findOne({ id: req.params.id });
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        const courses = await Course.find({ id: { $in: teacher.courses } });
        res.status(200).json({ ...teacher._doc, courses });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
