const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Teacher = require("../Model/TeacherModel");
const Subject = require("../Model/Subject");
const Class = require("../Model/ClassModel");

dotenv.config();

const teachers = [
    {
        id: 1,
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        department: "Computer Science",
        courses: [1, 2], // References courses
        subjects: [], // Will be populated after checking existing subjects
        classes: [] // Will be populated after checking existing classes
    },
    {
        id: 2,
        name: "Bob Smith",
        email: "bob.smith@example.com",
        department: "Mathematics",
        courses: [3], // References courses
        subjects: [], // Will be populated after checking existing subjects
        classes: [] // Will be populated after checking existing classes
    },
    {
        id: 3,
        name: "Charlie Brown",
        email: "charlie.brown@example.com",
        department: "Physics",
        courses: [4, 5], // References courses
        subjects: [], // Will be populated after checking existing subjects
        classes: [] // Will be populated after checking existing classes
    },
    {
        id: 4,
        name: "Diana Prince",
        email: "diana.prince@example.com",
        department: "Engineering",
        courses: [6], // References courses
        subjects: [], // Will be populated after checking existing subjects
        classes: [] // Will be populated after checking existing classes
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

        // Clear existing teachers
        await Teacher.deleteMany();
        console.log("Existing teachers cleared");

        // Insert new teachers
        const insertedTeachers = await Teacher.insertMany(teachers);
        console.log("Teachers added successfully");

        // Now, update the classes array in each teacher
        const classes = await Class.find(); // Fetch all classes
        const subjects = await Subject.find(); // Fetch all subjects

        // Check if classes and subjects are populated
        if (!classes.length || !subjects.length) {
            console.error("No classes or subjects found. Please ensure they are seeded before seeding teachers.");
            mongoose.connection.close();
            return;
        }

        // Now, update the classes array in each teacher
        insertedTeachers.forEach((teacher, index) => {
            // Assign classes based on the index
            if (index < classes.length) {
                teacher.classes.push(classes[index]._id); // Assign class
            }

            // Assign subjects based on the index
            if (index < subjects.length) {
                teacher.subjects.push(subjects[index]._id); // Assign subject
            }
        });

        // Update teachers with their classes and subjects
        await Promise.all(insertedTeachers.map(teacher =>
            Teacher.findByIdAndUpdate(teacher._id, { classes: teacher.classes, subjects: teacher.subjects })
        ));

        // Log the results
        console.log("\nSeeded teachers with their classes and subjects:");
        insertedTeachers.forEach(teacher => {
            console.log(`${teacher.name}: Classes ${teacher.classes.join(', ')}, Subjects ${teacher.subjects.join(', ')}`);
        });

        // Close the connection
        mongoose.connection.close();
    } catch (error) {
        console.error("Error seeding database:", error);
        mongoose.connection.close();
    }
};

seedDatabase();