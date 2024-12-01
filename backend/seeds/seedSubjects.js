const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Subject = require("../Model/Subject");
const Course = require("../Model/CourseModel");
const Teacher = require("../Model/TeacherModel");

dotenv.config();

const subjects = [
    {
        id: 1,
        name: "Computer Science",
        description: "Explore the fundamentals of programming and software development",
        courses: [1, 2], // References "Introduction to Programming" and "Web Development"
        image: "/images/image1.png",
        teachers: [] // Will be populated after checking existing teachers
    },
    {
        id: 2,
        name: "Mathematics",
        description: "Master mathematical concepts and problem-solving techniques",
        courses: [3], // References "Calculus I"
        image: "/images/image1.png",
        teachers: [] // Will be populated after checking existing teachers
    },
    {
        id: 3,
        name: "Physics",
        description: "Understand the fundamental laws that govern the universe",
        courses: [4, 5], // References "Quantum Mechanics" and "Classical Mechanics"
        image: "/images/image1.png",
        teachers: [] // Will be populated after checking existing teachers
    },
    {
        id: 4,
        name: "Engineering",
        description: "Learn practical applications of science and mathematics",
        courses: [6], // References "Thermodynamics"
        image: "/images/image1.png",
        teachers: [] // Will be populated after checking existing teachers
    }
];

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.DBURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");

        // Verify that referenced courses exist
        const courseIds = subjects.flatMap(subject => subject.courses);
        const existingCourses = await Course.find({ id: { $in: courseIds } });

        if (existingCourses.length !== courseIds.length) {
            console.error("Some referenced courses don't exist! Please run seedData.js first.");
            mongoose.connection.close();
            return;
        }

        // Clear existing subjects
        await Subject.deleteMany();
        console.log("Existing subjects cleared");

        // Insert new subjects
        const insertedSubjects = await Subject.insertMany(subjects);
        console.log("Subjects added successfully");

        // Now, update the teachers array in each subject
        const teachers = await Teacher.find(); // Fetch all teachers
        insertedSubjects.forEach(subject => {
            // Example: Assign teachers based on some logic
            if (subject.name === "Computer Science") {
                subject.teachers.push(teachers[0]._id); // Assign first teacher
            } else if (subject.name === "Mathematics") {
                subject.teachers.push(teachers[1]._id); // Assign second teacher
            } else if (subject.name === "Physics") {
                subject.teachers.push(teachers[2]._id); // Assign third teacher
            } else if (subject.name === "Engineering") {
                subject.teachers.push(teachers[3]._id); // Assign fourth teacher
            }
        });

        // Update subjects with their teachers
        await Promise.all(insertedSubjects.map(subject =>
            Subject.findByIdAndUpdate(subject._id, { teachers: subject.teachers })
        ));

        // Log the results
        console.log("\nSeeded subjects with their teachers:");
        insertedSubjects.forEach(subject => {
            console.log(`${subject.name}: Teachers ${subject.teachers.join(', ')}`);
        });

        // Close the connection
        mongoose.connection.close();
    } catch (error) {
        console.error("Error seeding database:", error);
        mongoose.connection.close();
    }
};

seedDatabase();