const Department = require('../Model/DepartmentModel');


// Get all departments
exports.getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.find().populate('classes');
        res.status(200).json(departments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};

// Get department by ID
exports.getDepartmentById = async (req, res) => {
    const { id } = req.params;

    try {
        const department = await Department.findById(id).populate('classes');
        if (!department) {
            return res.status(404).json({ msg: "Department not found" });
        }
        res.status(200).json(department);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};