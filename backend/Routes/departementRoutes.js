const express = require('express');
const router = express.Router();
const departmentController = require('../Controller/departmentController');

// Get all departments
router.get('/', departmentController.getAllDepartments);

// Get department by ID
router.get('/:id', departmentController.getDepartmentById);

module.exports = router;