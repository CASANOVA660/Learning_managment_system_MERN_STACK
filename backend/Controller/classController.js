const Class = require('../Model/ClassModel');
const Student = require('../Model/StudentModel');
const Subject = require('../Model/Subject');
const Department = require('../Model/DepartmentModel');
const mongoose = require('mongoose');

// Get all classes
exports.getAllClasses = async (req, res) => {
    try {
        const classes = await Class.find().lean();


        const populatedClasses = classes.map(cls => ({
            ...cls,
        }));

        res.status(200).json(populatedClasses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getClassById = async (req, res) => {
    try {

        // Validate if the ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid class ID format' });
        }

        // Find the class by `_id` (ObjectId)
        const classData = await Class.findById(req.params.id).populate('subjects');

        if (!classData) {
            return res.status(404).json({ message: 'Class not found' });
        }

        // Fetch related students if `students` array contains ObjectIds
        const students = await Student.find({ _id: { $in: classData.students } }).lean();

        // Combine class data with populated students
        const populatedClass = {
            ...classData.toObject(),
            students,
        };

        res.status(200).json(populatedClass);
    } catch (error) {
        console.error("Error fetching class by ID:", error.message);
        res.status(500).json({ message: error.message });
    }
};

// Get subjects by class ID
exports.getClassSubjects = async (req, res) => {
    try {
        const classId = parseInt(req.params.id);
        console.log("Fetching subjects for class ID:", classId);
        const classData = await Class.findOne({ id: classId });
        console.log("Class data fetched:", classData);

        if (!classData) {
            return res.status(404).json({ message: 'Class not found' });
        }

        const subjects = await Subject.find({ _id: { $in: classData.subjects } });
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get students by class ID
exports.getClassStudents = async (req, res) => {
    try {
        const classId = parseInt(req.params.id);
        const classData = await Class.findOne({ id: classId });

        if (!classData) {
            return res.status(404).json({ message: 'Class not found' });
        }

        const students = await Student.find({ id: { $in: classData.students } });
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getNextClassId = async () => {
    const lastClass = await Class.findOne().sort({ id: -1 }); // Get the last class by ID
    return lastClass ? lastClass.id + 1 : 1; // Increment the ID or start from 1
};

exports.addClass = async (req, res) => {
    try {
        const { name, academicYear, capacity, department } = req.body;
        const nextId = await getNextClassId(); // Get the next available class ID
        const newClass = new Class({ id: nextId, name, academicYear, capacity, department });
        await newClass.save();

        // Add the class to the corresponding department
        await Department.findByIdAndUpdate(department, { $push: { classes: newClass._id } });

        res.status(201).json(newClass);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

