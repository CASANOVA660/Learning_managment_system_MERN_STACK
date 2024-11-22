const express = require("express");
const router = express.Router();
const Subject = require("../Model/Subject");

const getAllSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find();
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ message: "Error fetching subjects", error: error.message });
    }
};

module.exports = {
    getAllSubjects,
};