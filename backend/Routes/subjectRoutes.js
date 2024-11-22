const express = require("express");
const router = express.Router();
const { getAllSubjects } = require("../Controller/subjectController"); // Adjust path as needed

// Route to get all subjects
router.get("/subjects", getAllSubjects);

module.exports = router;
