const mongoose = require('mongoose');
const Teacher = require('../Model/TeacherModel');
const Course = require('../Model/CourseModel');
require('dotenv').config();

const teachers = [
    {
        id: 1,
        name: "Dr. Sarah Johnson",
        email: "sarah.johnson@university.edu",
        department: "Computer Science",
        courses: [1, 2]
    },
    {
        id: 2,
        name: "Prof. Michael Chen",
        email: "michael.chen@university.edu",
        department: "Mathematics",
        courses: [3]
    },
    {
        id: 3,
        name: "Dr. Emily Brown",
        email: "emily.brown@university.edu",
        department: "Physics",
        courses: [4, 5, 6]
    }
];

const courses = [
    {
        id: 1,
        name: "Introduction to Programming",
        description: "Learn the basics of programming with Python and JavaScript",
        instructor: 1,
        progress: 0,
        enrolled: "50 students",
        credits: 3,
        nextClass: new Date("2024-04-15T10:00:00")
    },
    {
        id: 2,
        name: "Web Development",
        description: "Master modern web development with React and Node.js",
        instructor: 1,
        progress: 0,
        enrolled: "45 students",
        credits: 4,
        nextClass: new Date("2024-04-16T14:00:00")
    },
    {
        id: 3,
        name: "Calculus I",
        description: "Introduction to differential and integral calculus",
        instructor: 2,
        progress: 0,
        enrolled: "60 students",
        credits: 4,
        nextClass: new Date("2024-04-15T09:00:00")
    },
    {
        id: 4,
        name: "Quantum Mechanics",
        description: "Introduction to quantum physics and its applications",
        instructor: 3,
        progress: 0,
        enrolled: "30 students",
        credits: 4,
        nextClass: new Date("2024-04-17T11:00:00")
    },
    {
        id: 5,
        name: "Classical Mechanics",
        description: "Study of motion and forces in classical physics",
        instructor: 3,
        progress: 0,
        enrolled: "35 students",
        credits: 3,
        nextClass: new Date("2024-04-18T13:00:00")
    },
    {
        id: 6,
        name: "Thermodynamics",
        description: "Study of heat, energy, and their relationships",
        instructor: 3,
        progress: 0,
        enrolled: "40 students",
        credits: 3,
        nextClass: new Date("2024-04-19T15:00:00")
    }
];

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.DBURI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await Teacher.deleteMany({});
        await Course.deleteMany({});
        console.log('Cleared existing data');

        // Insert new data
        await Teacher.insertMany(teachers);
        await Course.insertMany(courses);
        console.log('Successfully seeded database');

        // Disconnect from MongoDB
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');

    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

// Run the seed function
seedDatabase();