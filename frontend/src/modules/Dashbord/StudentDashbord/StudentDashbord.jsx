import React from "react";
import Header from "./Header/header";
import SideBar from "./sideBar/sideBar";
import Cardinfopage from "./cards/pages/cardinfopage";
import Progress from "./charts/Progress";
import GradeOverview from "./charts/GradeOverview";
import AttendanceTracker from "./charts/AttendanceTracker"; // Import the AttendanceTracker component
import CourseProgress from "./charts/CourseProgress";
import AchievementPoints from "./charts/AchievementPoints"; // Import the AchievementPoints component
import Schedule from "./Schedule/Schedule"; // Import the Schedule component
import StudyTimeTracker from "./charts/StudyTimeTracker";
import UpcomingAssignments from "./UpcomingAssignmentscard/UpcomingAssignments";
import AdditionalInfo from "./AdditionalInfo/AdditionalInfo";
import Forum from "./Forum/Forum"
import ChatSection from "./chatSection/ChatSection"
import './StudentDashbord.css';



const StudentDashbord = () => {
    return (
        <div className="page-container">
            <Header />
            <SideBar />
            <div className="content">
                <Cardinfopage />
                <Progress />
                <div className="overview-container">
                    <div className="grade-overview-container">
                        <GradeOverview />
                    </div>
                    <div className="attendance-tracker-container">
                        <AttendanceTracker />
                    </div>
                </div>
                {/* Course Progress, Schedule, and Achievement Points side by side */}
                <div className="course-achievement-container">
                    <div className="course-progress-container">
                        <CourseProgress />
                    </div>
                    <div className="schedule-container">
                        <Schedule /> {/* Assuming you have a Schedule component */}
                    </div>
                    <div className="achievement-points-container">
                        <AchievementPoints />
                    </div>
                </div>
                {/* Study Time Tracker and Upcoming Assignments side by side */}
                <div className="study-upcoming-container">
                    <div className="study-time-tracker-container">
                        <StudyTimeTracker />
                    </div>
                    <div className="upcoming-assignments-container">
                        <UpcomingAssignments />
                    </div>
                </div>
                {/* New AdditionalInfo Component with static data */}
                <AdditionalInfo
                />
                {/* Forum section */}
                <div className="forum-wrapper">
                    <Forum />
                </div>
                <div className="chat-section">
                    <ChatSection />
                </div>
            </div>

        </div>
    );
};

export default StudentDashbord;
