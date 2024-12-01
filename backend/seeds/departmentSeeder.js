const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Class = require("../Model/ClassModel");
const Department = require("../Model/DepartmentModel");
const Subject = require("../Model/Subject");

dotenv.config();

const departments = [
    { name: "Informatique", classes: [] },
    { name: "Mecanique", classes: [] },
    { name: "Electrique", classes: [] }
];

const classes = [
    {
        id: 1,
        name: "DSI",
        academicYear: "2023-2024",
        department: null,
        students: [],
        subjects: [],
        capacity: 30,
        schedule: [
            {
                day: "Monday",
                timeSlots: [
                    {
                        startTime: "09:00",
                        endTime: "10:30",
                        subject: null
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        name: "MDW",
        academicYear: "2023-2024",
        department: null,
        students: [],
        subjects: [],
        capacity: 25,
        schedule: [
            {
                day: "Tuesday",
                timeSlots: [
                    {
                        startTime: "10:30",
                        endTime: "12:00",
                        subject: null
                    }
                ]
            }
        ]
    },
    // Add other classes as needed...
];

const seedDepartments = async () => {
    try {
        await mongoose.connect(process.env.DBURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");

        // Clear existing departments
        await Department.deleteMany();
        console.log("Existing departments cleared");

        // Clear existing classes
        await Class.deleteMany();
        console.log("Existing classes cleared");

        // Insert new departments
        const insertedDepartments = await Department.insertMany(departments);
        console.log("Departments added successfully");

        const subjects = await Subject.find();

        // Check if subjects are populated
        if (!subjects.length) {
            console.error("No subjects found. Please ensure they are seeded before seeding classes.");
            mongoose.connection.close();
            return;
        }

        // Assign classes to departments and insert them
        classes.forEach((classItem, index) => {
            if (index < 2) {
                classItem.department = insertedDepartments[0]._id; // Informatique
                insertedDepartments[0].classes.push(classItem._id); // Add class ID to Informatique
            } else if (index < 4) {
                classItem.department = insertedDepartments[1]._id; // Mecanique
                insertedDepartments[1].classes.push(classItem._id); // Add class ID to Mecanique
            } else {
                classItem.department = insertedDepartments[2]._id; // Electrique
                insertedDepartments[2].classes.push(classItem._id); // Add class ID to Electrique
            }

            // Assign subjects based on the index
            if (index < subjects.length) {
                classItem.subjects.push(subjects[index]._id); // Assign subject
            }
        });

        // Insert new classes
        const insertedClasses = await Class.insertMany(classes);
        console.log("Classes added successfully");

        // Update departments with their classes
        await Promise.all(insertedDepartments.map(department =>
            Department.findByIdAndUpdate(department._id, { classes: department.classes })
        ));

        // Log the results
        console.log("\nSeeded departments with their classes:");
        insertedDepartments.forEach(department => {
            console.log(`${department.name}: Classes ${department.classes.join(', ')}`);
        });

        // Close the connection
        mongoose.connection.close();
    } catch (error) {
        console.error("Error seeding database:", error);
        mongoose.connection.close();
    }
};

seedDepartments();