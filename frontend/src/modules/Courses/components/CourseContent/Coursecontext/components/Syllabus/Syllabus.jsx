import React from 'react';
import './Syllabus.css';

const Syllabus = () => {
    const syllabusContent = [
        {
            week: 1,
            title: "Introduction to Programming Concepts",
            description: "Learn the fundamentals of programming and basic concepts"
        },
        {
            week: 2,
            title: "Variables and Data Types",
            description: "Understanding different types of variables and data structures"
        },
        {
            week: 3,
            title: "Control Structures",
            description: "Learning about loops and conditional statements"
        },
        {
            week: 4,
            title: "Functions and Modules",
            description: "Understanding modular programming and function creation"
        },
        {
            week: 5,
            title: "Basic Data Structures",
            description: "Introduction to arrays, lists, and basic algorithms"
        }
    ];

    return (
        <div className="syllabus-container">
            <h2>Course Syllabus</h2>
            <div className="syllabus-content">
                {syllabusContent.map((week) => (
                    <div key={week.week} className="syllabus-week">
                        <h3>Week {week.week}</h3>
                        <p className="week-title">{week.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Syllabus;