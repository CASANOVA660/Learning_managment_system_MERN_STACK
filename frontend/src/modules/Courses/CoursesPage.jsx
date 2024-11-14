import React from 'react';
import Sidebar from '../Dashbord/StudentDashbord/sideBar/sideBar';
import SubjectCard from './components/SubjectCard/SubjectCard';
import './CoursesPage.css'

const CoursesPage = () => {
    return (
        <div className="courses-page">
            <Sidebar />
            <div className="subject-card-container">
                <SubjectCard />
            </div>
        </div>
    );
};

export default CoursesPage;
