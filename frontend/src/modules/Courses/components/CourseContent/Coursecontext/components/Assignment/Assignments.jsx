import React, { useState } from 'react';
import './Assignments.css';

const Assignments = () => {
    const [selectedAssignment, setSelectedAssignment] = useState(null);

    const assignmentsContent = [
        {
            id: 1,
            title: "Basic Programming Concepts Quiz",
            dueDate: "2023-07-25",
            status: "Completed",
            description: "Test your understanding of basic programming concepts.",
            questions: [
                "1. What is a variable?",
                "2. Explain the difference between a for loop and a while loop.",
                "3. Write a simple function to calculate the factorial of a number."
            ]
        },
        {
            id: 2,
            title: "Simple Game Project",
            dueDate: "2023-08-10",
            status: "Pending",
            description: "Create a simple game using the concepts learned in class."
        }
    ];

    if (selectedAssignment) {
        return (
            <div className="assignment-detail-container">
                <h2>{selectedAssignment.title}</h2>
                <div className="assignment-metadata">
                    <p className="due-date">Due: {selectedAssignment.dueDate}</p>
                    <span className={`status-badge ${selectedAssignment.status.toLowerCase()}`}>
                        {selectedAssignment.status}
                    </span>
                </div>

                <div className="assignment-description">
                    <p>{selectedAssignment.description}</p>
                </div>

                {selectedAssignment.questions && (
                    <div className="questions-section">
                        <h3>Questions:</h3>
                        <ul className="questions-list">
                            {selectedAssignment.questions.map((question, index) => (
                                <li key={index}>{question}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="answer-section">
                    <h3>Your Answer:</h3>
                    <textarea
                        placeholder="Type your answer here..."
                        rows={10}
                        className="answer-input"
                    />
                </div>

                <div className="assignment-actions">
                    <button className="secondary-button" onClick={() => setSelectedAssignment(null)}>
                        Back to Assignments
                    </button>
                    <div className="right-actions">
                        <button className="pdf-button">
                            <span className="pdf-icon">📄</span> View PDF
                        </button>
                        <button className="submit-button">
                            Submit Assignment
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="assignments-wrapper">
            <h2>Assignments</h2>
            <div className="assignments-list">
                {assignmentsContent.map((assignment) => (
                    <div
                        key={assignment.id}
                        className="assignment-item"
                        onClick={() => setSelectedAssignment(assignment)}
                    >
                        <div className="assignment-main-info">
                            <h3>{assignment.title}</h3>
                            <p className="due-date">Due: {assignment.dueDate}</p>
                        </div>
                        <span className={`status-tag ${assignment.status.toLowerCase()}`}>
                            {assignment.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Assignments;