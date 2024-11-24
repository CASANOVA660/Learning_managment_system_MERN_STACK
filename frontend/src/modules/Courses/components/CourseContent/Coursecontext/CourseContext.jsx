import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LuArrowLeft } from "react-icons/lu";
import Syllabus from './components/Syllabus/Syllabus';
import Assignments from './components/Assignment/Assignments';
import axiosRequest from '../../../../../lib/AxiosConfig';
import './CourseContextPage.css';

const CourseContext = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('grades');
    const [courseDetails, setCourseDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Static grades for now
    const grades = [
        { name: "Programming Basics Quiz", score: "95%" },
        { name: "First Coding Assignment", score: "88%" },
    ];

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const response = await axiosRequest.get(`/chapters/${id}`);
                setCourseDetails(response.data);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching course details:', err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchCourseDetails();
        }
    }, [id]);

    if (loading) {
        return <div className="loading-spinner">Loading...</div>;
    }

    if (error) {
        return (
            <div className="error-message">
                Error: {error}
                <button onClick={() => navigate(-1)}>Go Back</button>
            </div>
        );
    }

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
                            {grades.map((grade, index) => (
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
                <h1>{courseDetails?.name}</h1>
                <p className="course-code">{courseDetails?.description}</p>
            </div>

            <div className="instructor-info">
                <div className="avatar">
                    <span>
                        {courseDetails?.instructor?.name?.split(' ')
                            .map(n => n[0])
                            .join('') || 'IN'}
                    </span>
                </div>
                <span className="instructor-name">{courseDetails?.instructor?.name}</span>
            </div>

            <div className="course-stats-grid">
                <div className="stat-item">
                    <span className="stat-label">Credits</span>
                    <span className="stat-value">{courseDetails?.credits}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Enrolled</span>
                    <span className="stat-value">{courseDetails?.enrolled}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Progress</span>
                    <span className="stat-value">{courseDetails?.progress}%</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Next Class</span>
                    <span className="stat-value">
                        {new Date(courseDetails?.nextClass).toLocaleDateString()}
                    </span>
                </div>
            </div>

            <div className="progress-bar-container">
                <div
                    className="progress-bar"
                    style={{ width: `${courseDetails?.progress}%` }}
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