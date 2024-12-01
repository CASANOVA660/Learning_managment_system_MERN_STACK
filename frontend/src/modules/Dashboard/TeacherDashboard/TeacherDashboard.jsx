import React from "react";
import HeaderTeacher from "./components/headerTeacher/headerTeacher";
import SideBarT from "./components/sideBarT/sideBarT";
import CardInfoPageT from "./components/cardInfoPageT/cardInfoPageT";
import ScheduleT from "./components/ScheduleT/ScheduleT";
import StudentPerformance from "./components/StudentPerformanceT/StudentPerformanceT";
import UpcomingClassesT from "./components/UpcomingClassesT/UpcomingClassesT";
import AnnouncementsT from "./components/AnnouncementsT/AnnouncementsT";
import './TeacherDashboard.css';

const TeacherDashboard = () => {
    return (
        <div className="page-container">
            <HeaderTeacher />
            <SideBarT />
            <div className="content">
                {/* Overview Cards */}
                <CardInfoPageT />

                {/* Schedule Section */}
                <ScheduleT />

                {/* Student Performance */}
                <div className="performance-container">
                    <StudentPerformance />
                </div>

                {/* Upcoming Classes */}
                <div className="classes-container">
                    <UpcomingClassesT />
                </div>

                {/* Announcements Section */}
                <div className="announcements-wrapper">
                    <AnnouncementsT />
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;