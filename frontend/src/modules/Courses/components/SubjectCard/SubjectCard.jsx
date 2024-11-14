import React from "react";
import { Card, CardContent } from "../../../Dashbord/StudentDashbord/cards/cardinfo";
import './SubjectCard.css';

const SubjectCard = ({ subject, onClick }) => (
    <Card className="subject-card" onClick={() => onClick(subject)}>
        <div className="subject-card-image-container">
            <img
                src={subject.image || '/images/default-image.png'}
                alt={subject.name || "Subject Image"}
                className="subject-card-image"
            />
            <div className="subject-card-overlay">
                <h3 className="subject-card-title">{subject.name}</h3>
            </div>
        </div>
        <CardContent className="subject-card-content">
            <p className="subject-card-description">{subject.description}</p>
            <p className="subject-card-courses">{subject.courses.length} courses available</p>
        </CardContent>
    </Card>
);

const SubjectCardTest = () => {
    const subjects = [
        {
            name: "Mathematics",
            description: "Learn the foundations of mathematics, algebra, and calculus.",
            courses: ["Algebra", "Calculus", "Statistics"],
            image: "/images/image1.png",
        },
        {
            name: "Physics",
            description: "Explore the fundamentals of physics, mechanics, and thermodynamics.",
            courses: ["Mechanics", "Thermodynamics", "Electromagnetism"],
            image: "/images/image1.png",
        },
        {
            name: "Computer Science",
            description: "Dive into programming, data structures, and algorithms.",
            courses: ["Data Structures", "Algorithms", "Web Development"],
            image: "/images/image1.png",
        },
    ];

    const handleClick = (subject) => {
        alert(`Clicked on: ${subject.name}`);
    };

    return (
        <div className="subject-card-grid">
            {subjects.map((subject, index) => (
                <SubjectCard key={index} subject={subject} onClick={handleClick} />
            ))}
        </div>
    );
};

export default SubjectCardTest;
