const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../Model/StudentModel");
const Teacher = require("../Model/TeacherModel");
const Counter = require("../Model/CounterModel");
const Class = require("../Model/ClassModel");

// Student Registration
const RegisterStudent = async (req, res) => {
    const { firstName, lastName, email, password, class: classId } = req.body;
    try {
        // Check if user exists
        const user = await Student.findOne({ email });
        if (user) return res.status(400).json({ msg: "User already exists" });

        // Check if class exists
        const classExists = await Class.findOne({ id: classId });
        if (!classExists) return res.status(400).json({ msg: "Invalid class selected" });

        // Get next student ID
        const counter = await Counter.findOneAndUpdate(
            { id: "autovalStudent" },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );

        // Create new student
        const newUser = new Student({
            id: counter.seq,
            firstName,
            lastName,
            email,
            password,
            class: classId,
            createdAt: new Date()
        });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);

        // Save student
        await newUser.save();

        // Update class with new student
        await Class.findOneAndUpdate(
            { id: classId },
            { $push: { students: new mongoose.Types.ObjectId(newUser.id) } }
        );

        // Create token payload
        const payload = {
            id: newUser.id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            class: classId,
            role: newUser.role
        };

        // Sign token
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: 3600,
        });

        res.status(201).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};

// Teacher Registration
const RegisterTeacher = async (req, res) => {
    const { firstName, lastName, email, password, department } = req.body; // Get firstName and lastName
    try {
        console.log("Received data:", req.body); // Log the incoming data

        // Check if teacher already exists
        const existingTeacher = await Teacher.findOne({ email });
        if (existingTeacher) {
            return res.status(400).json({ msg: "Teacher already exists with this email" });
        }

        // Get next teacher ID from counter
        const counter = await Counter.findOneAndUpdate(
            { id: "autovalTeacher" },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );

        console.log("Counter for teacher ID:", counter); // Log the counter

        // Create new teacher
        const newTeacher = new Teacher({
            id: counter.seq,
            name: `${firstName} ${lastName}`, // Combine firstName and lastName into name
            email,
            password,
            department,
            createdAt: new Date(),
            courses: [],
            subjects: [],
            classes: [],
            ratings: [],
            averageRating: 0
        });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        newTeacher.password = await bcrypt.hash(password, salt);

        // Save teacher
        await newTeacher.save();

        // Create JWT payload
        const payload = {
            id: newTeacher.id,
            name: newTeacher.name, // Use name instead of firstName and lastName
            email: newTeacher.email,
            department: newTeacher.department // Include department if needed
        };

        // Sign token
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: 3600,
        });

        res.status(201).json({
            token,
            teacher: {
                id: newTeacher.id,
                name: newTeacher.name,
                email: newTeacher.email,
                department: newTeacher.department // Include department in response if needed
            }
        });

    } catch (err) {
        console.error("Error in RegisterTeacher:", err); // Log the error
        res.status(500).json({ msg: "Server error" });
    }
};

// Login Controller (can be used for both students and teachers)
const Login = async (req, res) => {
    const { email, password, role } = req.body;

    try {
        // Determine which model to use based on role
        const Model = role === 'teacher' ? Teacher : Student;

        // Find user
        const user = await Model.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Create payload
        const payload = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role
        };

        if (role === 'teacher') {
            payload.experience = user.experience; // Keep experience if needed
        }

        // Sign token
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: 3600,
        });

        res.json({ token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};

module.exports = {
    RegisterStudent,
    RegisterTeacher,
    Login
};