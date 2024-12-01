const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Class = require("../Model/ClassModel");
const Teacher = require("../Model/TeacherModel");
const Subject = require("../Model/Subject");
const Department = require("../Model/DepartmentModel");

dotenv.config();

const classes = [
    {
        id: 1,
        name: "DSI",
        academicYear: "2023-2024",
        department: null, // To be populated later
        students: [],
        subjects: [], // Will be populated later
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
    {
        id: 3,
        name: "MV",
        academicYear: "2023-2024",
        department: null,
        students: [],
        subjects: [],
        capacity: 20,
        schedule: [
            {
                day: "Wednesday",
                timeSlots: [
                    {
                        startTime: "13:00",
                        endTime: "14:30",
                        subject: null
                    }
                ]
            }
        ]
    },
    {
        id: 4,
        name: "RMI",
        academicYear: "2023-2024",
        department: null,
        students: [],
        subjects: [],
        capacity: 35,
        schedule: [
            {
                day: "Thursday",
                timeSlots: [
                    {
                        startTime: "14:30",
                        endTime: "16:00",
                        subject: null
                    }
                ]
            }
        ]
    },
    {
        id: 5,
        name: "ELI",
        academicYear: "2023-2024",
        department: null,
        students: [],
        subjects: [],
        capacity: 30,
        schedule: [
            {
                day: "Friday",
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
        id: 6,
        name: "EVT",
        academicYear: "2023-2024",
        department: null,
        students: [],
        subjects: [],
        capacity: 25,
        schedule: [
            {
                day: "Saturday",
                timeSlots: [
                    {
                        startTime: "10:30",
                        endTime: "12:00",
                        subject: null
                    }
                ]
            }
        ]
    }
];

const seedClasses = async () => {
    try {
        await mongoose.connect(process.env.DBURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");

        // Clear existing data
        await Class.deleteMany();
        await Department.updateMany({}, { $set: { classes: [] } });
        console.log("Existing classes and department references cleared");

        // Fetch all departments
        const departments = await Department.find();

        if (!departments.length) {
            console.error("No departments found. Please ensure they are seeded before seeding classes.");
            mongoose.connection.close();
            return;
        }

        // Fetch all subjects
        const subjects = await Subject.find();

        if (!subjects.length) {
            console.error("No subjects found. Please ensure they are seeded before seeding classes.");
            mongoose.connection.close();
            return;
        }

        // Create and assign classes to departments
        const departmentMap = {
            Informatique: departments[0]._id,
            Mecanique: departments[1]?._id,
            Electrique: departments[2]?._id
        };

        const insertedClasses = await Promise.all(
            classes.map(async (classItem, index) => {
                const departmentKey = index < 2 ? "Informatique" :
                    index < 4 ? "Mecanique" :
                        "Electrique";
                classItem.department = departmentMap[departmentKey];

                // Assign a subject to each class (if available)
                if (index < subjects.length) {
                    classItem.subjects.push(subjects[index]._id);
                }

                // Save class
                const newClass = await Class.create(classItem);

                // Add class to the corresponding department
                await Department.findByIdAndUpdate(
                    classItem.department,
                    { $push: { classes: newClass._id } }
                );

                return newClass;
            })
        );

        console.log("Classes added successfully");
        console.log("\nSeeded classes with their departments and subjects:");
        insertedClasses.forEach(classItem => {
            console.log(`${classItem.name}: Department ${classItem.department}, Subjects ${classItem.subjects.join(', ')}`);
        });

        mongoose.connection.close();
    } catch (error) {
        console.error("Error seeding database:", error);
        mongoose.connection.close();
    }
};

seedClasses();