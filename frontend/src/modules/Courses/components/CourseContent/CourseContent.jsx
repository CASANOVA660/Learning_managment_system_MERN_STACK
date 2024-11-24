import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Progress } from './components/Progress/Progress';
import { Avatar, AvatarImage, AvatarFallback } from './components/Avatar/Avatar';
import { LuArrowLeft } from "react-icons/lu";
import Sidebar from '../../../Dashbord/StudentDashbord/sideBar/sideBar';
import axiosRequest from '../../../../lib/AxiosConfig';
import './CourseContent.css';

const CourseCard = ({ course }) => {
    const navigate = useNavigate();

    const handleCourseClick = () => {
        navigate(`/chapters/${course.id}/details`);
    };

    return (
        <div className="course-card">
            <div className="course-main-info">
                <h3>{course.name}</h3>
                <p className="course-code">{course.description}</p>
            </div>

            <div className="instructor-section">
                <Avatar>
                    <AvatarFallback>
                        {course.instructor?.name?.split(' ')
                            .map(n => n[0])
                            .join('') || 'IN'}
                    </AvatarFallback>
                </Avatar>
                <span>{course.instructor?.name}</span>
            </div>

            <div className="course-stats">
                <div className="stat-item">
                    <span className="stat-label">Credits</span>
                    <p className="stat-value">{course.credits}</p>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Enrolled</span>
                    <p className="stat-value">{course.enrolled}</p>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Next Class</span>
                    <p className="stat-value">
                        {new Date(course.nextClass).toLocaleDateString()}
                    </p>
                </div>
                <div className="progress-info">
                    <span>Progress</span>
                    <Progress value={course.progress} />
                </div>
            </div>

            <div className="course-actions">
                <button
                    className="action-button primary"
                    onClick={handleCourseClick}
                >
                    View Course Details
                </button>
            </div>
        </div>
    );
};

const CourseContent = () => {
    const { id: subjectId } = useParams();
    const navigate = useNavigate();
    const [subject, setSubject] = useState(null);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubjectAndCourses = async () => {
            try {
                const subjectResponse = await axiosRequest.get(`/subjects/${subjectId}`);
                setSubject(subjectResponse.data);

                const coursesResponse = await axiosRequest.get('/chapters');
                const allCourses = coursesResponse.data;

                const subjectCourses = allCourses.filter(course =>
                    subjectResponse.data.courses.includes(course.id)
                );

                setCourses(subjectCourses);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        if (subjectId) {
            fetchSubjectAndCourses();
        }
    }, [subjectId]);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <div className="error-message">
                    Error: {error}
                    <button onClick={() => navigate(-1)}>Go Back</button>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-layout">
            <div className="sidebar-wrapper">
                <Sidebar />
            </div>
            <div className="main-content">
                <div className="course-details-container">
                    <button
                        onClick={() => navigate(-1)}
                        className="back-button"
                    >
                        <LuArrowLeft className="back-icon" />
                        Back to Subjects
                    </button>

                    <h1>{subject?.name} Courses</h1>

                    <div className="courses-grid">
                        {courses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseContent;