const express = require("express");
const router = express.Router();
const Subject = require("../Model/Subject");
const Class = require("../Model/ClassModel")
const Counter = require("../Model/CounterModel");
const Teacher = require("../Model/TeacherModel")

const getAllSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find();
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ message: "Error fetching subjects", error: error.message });
    }
};

const getSubjectById = async (req, res) => {
    try {
        const subjectId = parseInt(req.params.id);
        const subject = await Subject.findOne({ id: subjectId });

        if (!subject) {
            return res.status(404).json({ message: "Subject not found" });
        }

        res.status(200).json(subject);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching subject",
            error: error.message
        });
    }
};
const getSubjectsForClass = async (req, res) => {
    const { classId } = req.params; // Get class ID from request parameters
    console.log("Received classId:", classId); // Log the received classId

    try {
        console.log("Querying Class with ID:", classId); // Log the query
        const classData = await Class.findOne({ id: classId }).populate('subjects');
        console.log("Class Data Retrieved:", classData); // Log the retrieved class data

        if (!classData) {
            console.log("Class not found for ID:", classId); // Log if class is not found
            return res.status(404).json({ message: "Class not found" });
        }

        console.log("Subjects for Class:", classData.subjects); // Log the subjects being returned
        res.status(200).json(classData.subjects);
    } catch (error) {
        console.error("Error fetching subjects:", error.message); // Log the error message
        res.status(500).json({ message: "Error fetching subjects", error: error.message });
    }
};

const addSubject = async (req, res) => {
    const { name, description, courses, image } = req.body;

    const counter = await Counter.findOneAndUpdate(
        { id: "autovalSubject" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );
    const subjectId = parseInt(req.params.id);

    try {
        const existingSubject = await Subject.findOne({ id: subjectId });
        if (existingSubject) {
            return res.status(400).json({ message: "Subject with this ID already exists" });
        }

        const newSubject = new Subject({
            id: subjectId,
            name,
            description,
            courses,
            image,
        });

        await newSubject.save();
        res.status(201).json({ message: "Subject added successfully", subject: newSubject });
    } catch (error) {
        res.status(500).json({ message: "Error adding subject", error: error.message });
    }
};
// Remove the 'teachersCleared' check entirely
const assignTeacherToSubject = async (req, res) => {
    const { subjectId } = req.params;
    const { teacherId } = req.body;

    try {
        const subject = await Subject.findById(subjectId);
        if (!subject) {
            return res.status(404).json({ message: "Subject not found" });
        }

        // Assign teacher to subject
        subject.teachers = [teacherId];  // Overwrite teachers array with the new teacher ID
        await subject.save();

        // Populate the teacher details (with name, etc.)
        const updatedSubject = await Subject.findById(subjectId).populate('teachers');  // This will populate teacher info

        res.status(200).json({
            message: "Teacher assigned successfully",
            subject: updatedSubject,  // Send the full subject including populated teacher details
        });
    } catch (error) {
        console.error("Error assigning teacher:", error);
        res.status(500).json({ message: "Error assigning teacher", error: error.message });
    }
};












module.exports = {
    getAllSubjects,
    getSubjectById,
    getSubjectsForClass,
    addSubject,
    assignTeacherToSubject
};