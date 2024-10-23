const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../Model/StudentModel");
const Counter = require("../Model/CounterModel");


const Register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const user = await Student.findOne({ email });
        if (user) return res.status(400).json({ msg: "User already exists" });

        const counter = await Counter.findOneAndUpdate(
            { id: "autovalStudent" },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );

        const newUser = new Student({
            id: counter.seq,
            firstName,
            lastName,
            email,
            password,
            createdAt: new Date()
        });

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);

        await newUser.save();
        const payload = {
            id: newUser.id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            role: newUser.role
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: 3600,
        });

        res.status(201).json({ token });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};

module.exports = { Register }