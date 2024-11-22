import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Progress } from '../../components/CourseContent/components/Progress/Progress';
import { Avatar, AvatarImage, AvatarFallback } from '../../components/CourseContent/components/Avatar/Avatar';
import { LuArrowLeft, LuMenu } from "react-icons/lu";
import Sidebar from '../../../Dashbord/StudentDashbord/sideBar/sideBar';
import './CourseContent.css';

const CourseDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const courseDetails = {
        id: 1,
        name: "Mathematics",
        description: "Learn the foundations of mathematics, algebra, and calculus.",
        instructor: "Dr. Jane Smith",
        progress: 75,
        enrolled: "25/30",
        credits: 3,
        nextClass: "2/20/2024",
    };

    return (
        <div className="dashboard-layout">
            <div className={`sidebar-wrapper ${isSidebarOpen ? 'open' : 'closed'}`}>
                <Sidebar />
            </div>
            <div className={`main-content ${isSidebarOpen ? '' : 'sidebar-closed'}`}>
                <button
                    className="menu-toggle"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    <LuMenu />
                </button>
                <div className="course-details-container">
                    <button
                        onClick={() => navigate(-1)}
                        className="back-button"
                    >
                        <LuArrowLeft className="back-icon" />
                        Back to Subjects
                    </button>

                    <h1>My Courses</h1>

                    <div className="course-card">
                        <div className="course-main-info" onClick={() => navigate(`/course/${courseDetails.id}/details`)} >
                            <h3>{courseDetails.name}</h3>
                            <p className="course-code">CS101 - {courseDetails.description}</p>
                        </div>

                        <div className="instructor-section">
                            <Avatar>
                                <AvatarFallback>JS</AvatarFallback>
                            </Avatar>
                            <span>{courseDetails.instructor}</span>
                        </div>

                        <div className="course-stats">
                            <div className="progress-info">
                                <span>Progress</span>
                                <Progress value={courseDetails.progress} />
                            </div>
                            <div className="achievement-points">
                                <span>Achievement Points</span>
                                <p>800</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetailsPage;