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

module.exports = {
    getAllSubjects,
    getSubjectById,
};