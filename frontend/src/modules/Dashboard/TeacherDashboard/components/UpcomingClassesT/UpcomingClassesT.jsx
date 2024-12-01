import React from 'react';
import './UpcomingClassesT.css';

const UpcomingClasses = () => {
    const classes = [
        {
            subject: "Mathematics",
            topic: "Calculus",
            time: "09:00 AM",
            date: "Today",
            students: 28,
            room: "Room 101"
        },
        {
            subject: "Physics",
            topic: "Quantum Mechanics",
            time: "11:30 AM",
            date: "Today",
            students: 24,
            room: "Lab 3"
        },
        {
            subject: "Chemistry",
            topic: "Organic Chemistry",
            time: "02:00 PM",
            date: "Tomorrow",
            students: 30,
            room: "Room 205"
        }
    ];

    return (
        <div className="upcoming-classes">
            <h2>Upcoming Classes</h2>
            <div className="classes-list">
                {classes.map((classItem, index) => (
                    <div className="class-card" key={index}>
                        <div className="class-time">
                            <span className="time">{classItem.time}</span>
                            <span className="date">{classItem.date}</span>
                        </div>
                        <div className="class-info">
                            <h3>{classItem.subject}</h3>
                            <p className="topic">{classItem.topic}</p>
                            <div className="class-details">
                                <span>👥 {classItem.students} students</span>
                                <span>🚪 {classItem.room}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpcomingClasses;