const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Subject = require("./Model/Subject"); // Adjust the path if necessary

dotenv.config();

const subjects = [
    {
        id: 1,
        name: "Mathematics",
        description: "Learn the foundations of mathematics, algebra, and calculus.",
        courses: ["Algebra", "Calculus", "Statistics"],
        image: "/images/image1.png",
    },
    {
        id: 2,
        name: "Physics",
        description: "Learn the foundations of physics, mechanics, and electromagnetism.",
        courses: ["Mechanics", "Electromagnetism", "Quantum Mechanics"],
        image: "/images/image1.png",
    },
    {
        id: 3,
        name: "Chemistry",
        description: "Learn the foundations of chemistry, organic and inorganic chemistry.",
        courses: ["Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry"],
        image: "/images/image1.png",
    },
    {
        id: 4,
        name: "Biology",
        description: "Learn the foundations of biology, genetics, and molecular biology.",
        courses: ["Genetics", "Molecular Biology", "Cell Biology"],
        image: "/images/image1.png",
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

        // Clear existing subjects
        await Subject.deleteMany();
        console.log("Existing subjects cleared");

        // Insert new subjects
        await Subject.insertMany(subjects);
        console.log("Subjects added successfully");

        // Close the connection
        mongoose.connection.close();
    } catch (error) {
        console.error("Error seeding database:", error);
        mongoose.connection.close();
    }
};

seedDatabase();
