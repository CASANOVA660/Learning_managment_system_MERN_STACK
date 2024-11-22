import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LuArrowLeft } from "react-icons/lu";
import Syllabus from './components/Syllabus/Syllabus';
import Assignments from './components/Assignment/Assignments';
import './CourseContextPage.css';

const CourseContext = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('grades');

    const courseDetails = {
        id: 1,
        title: "Introduction to Programming",
        code: "CS101",
        description: "Learn the fundamentals of computer science and programming",
        instructor: "Dr. Alice Johnson",
        progress: 70,
        credits: 4,
        enrolled: "150/200",
        nextClass: "7/17/2023",
        grades: [
            { name: "Programming Basics Quiz", score: "95%" },
            { name: "First Coding Assignment", score: "88%" },
        ]
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'syllabus':
                return <Syllabus />;
            case 'assignments':
                return <Assignments />;
            case 'grades':
                return (
                    <div className="grades-section">
                        <h2>Grades</h2>
                        <div className="grades-list">
                            {courseDetails.grades.map((grade, index) => (
                                <div key={index} className="grade-item">
                                    <span className="grade-name">{grade.name}</span>
                                    <span className="grade-score">{grade.score}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="course-detail-page">
            <button
                onClick={() => navigate(-1)}
                className="back-button"
            >
                <LuArrowLeft /> Back to Courses
            </button>

            <div className="course-header">
                <h1>{courseDetails.title}</h1>
                <p className="course-code">{courseDetails.code} - {courseDetails.description}</p>
            </div>

            <div className="instructor-info">
                <div className="avatar">
                    <span>AJ</span>
                </div>
                <span className="instructor-name">{courseDetails.instructor}</span>
            </div>

            <div className="course-stats-grid">
                <div className="stat-item">
                    <span className="stat-label">Credits</span>
                    <span className="stat-value">{courseDetails.credits}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Enrolled</span>
                    <span className="stat-value">{courseDetails.enrolled}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Progress</span>
                    <span className="stat-value">{courseDetails.progress}%</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Next Class</span>
                    <span className="stat-value">{courseDetails.nextClass}</span>
                </div>
            </div>

            <div className="progress-bar-container">
                <div
                    className="progress-bar"
                    style={{ width: `${courseDetails.progress}%` }}
                />
            </div>

            <div className="course-navigation">
                <button
                    className={`nav-button ${activeTab === 'syllabus' ? 'active' : ''}`}
                    onClick={() => setActiveTab('syllabus')}
                >
                    Syllabus
                </button>
                <button
                    className={`nav-button ${activeTab === 'assignments' ? 'active' : ''}`}
                    onClick={() => setActiveTab('assignments')}
                >
                    Assignments
                </button>
                <button
                    className={`nav-button ${activeTab === 'quizzes' ? 'active' : ''}`}
                    onClick={() => setActiveTab('quizzes')}
                >
                    Quizzes
                </button>
                <button
                    className={`nav-button ${activeTab === 'grades' ? 'active' : ''}`}
                    onClick={() => setActiveTab('grades')}
                >
                    Grades
                </button>
                <button
                    className={`nav-button ${activeTab === 'announcements' ? 'active' : ''}`}
                    onClick={() => setActiveTab('announcements')}
                >
                    Announcements
                </button>
            </div>

            {renderContent()}
        </div>
    );
};

export default CourseContext;