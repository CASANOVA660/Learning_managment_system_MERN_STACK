const express = require("express");
const router = express.Router();
const { getAllSubjects, getSubjectById } = require("../Controller/subjectController");

// Get all subjects
router.get("/", getAllSubjects);

// Get subject by ID
router.get("/:id", getSubjectById);

module.exports = router;