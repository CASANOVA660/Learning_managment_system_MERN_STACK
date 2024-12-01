const mongoose = require('mongoose');
const Assignment = require('../Model/Assignment');
require('dotenv').config();

const assignments = [
    {
        id: 1,
        title: "Basic Programming Concepts Quiz",
        description: "Test your understanding of basic programming concepts.",
        dueDate: new Date("2024-04-15T10:00:00"),
        status: "Not Started",
        questions: [
            "What is a variable?",
            "Explain the difference between a for loop and a while loop.",
            "Write a simple function to calculate the factorial of a number."
        ],
        responses: [],
        courseId: 1, // Introduction to Programming
        subjectId: 1, // Computer Science
        teacherId: 1, // Dr. Sarah Johnson
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 2,
        title: "Web Development Fundamentals",
        description: "Practice your understanding of HTML, CSS, and JavaScript basics.",
        dueDate: new Date("2024-04-16T14:00:00"),
        status: "Not Started",
        questions: [
            "Explain the difference between inline and block elements in HTML.",
            "What is the CSS box model?",
            "How do you handle asynchronous operations in JavaScript?"
        ],
        responses: [],
        courseId: 2, // Web Development
        subjectId: 1, // Computer Science
        teacherId: 1, // Dr. Sarah Johnson
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 3,
        title: "Calculus Fundamentals",
        description: "Test your understanding of basic calculus concepts.",
        dueDate: new Date("2024-04-15T09:00:00"),
        status: "Not Started",
        questions: [
            "Explain the concept of limits.",
            "What is the difference between differentiation and integration?",
            "Solve this differential equation problem."
        ],
        responses: [],
        courseId: 3, // Calculus I
        subjectId: 2, // Mathematics
        teacherId: 2, // Prof. Michael Chen
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 4,
        title: "Quantum Physics Principles",
        description: "Evaluate your understanding of quantum mechanics basics.",
        dueDate: new Date("2024-04-17T11:00:00"),
        status: "Not Started",
        questions: [
            "Explain the wave-particle duality.",
            "What is Heisenberg's uncertainty principle?",
            "Describe the quantum tunneling effect."
        ],
        responses: [],
        courseId: 4, // Quantum Mechanics
        subjectId: 3, // Physics
        teacherId: 3, // Dr. Emily Brown
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

// Connect to MongoDB
mongoose.connect(process.env.DBURI)
    .then(() => {
        console.log('Connected to MongoDB');
        return Assignment.insertMany(assignments);
    })
    .then(() => {
        console.log('Successfully seeded assignments');
        return mongoose.disconnect();
    })
    .then(() => {
        console.log('Disconnected from MongoDB');
    })
    .catch((error) => {
        console.error('Error seeding assignments:', error);
        process.exit(1);
    });