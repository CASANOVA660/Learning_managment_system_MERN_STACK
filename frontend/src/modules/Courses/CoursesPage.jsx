import React, { useState } from 'react';
import Sidebar from '../Dashbord/StudentDashbord/sideBar/sideBar';
import SubjectCard from './components/SubjectCard/SubjectCard';
import { Search } from 'lucide-react'; // Importing Search icon from 'lucide-react'
import FeaturedResourcesCard from './components/FeaturedResourcesCard/FeaturedResourcesCard';
import RecentAnnouncementsCard from './components/RecentAnnouncementsCard/RecentAnnouncementsCard';  // Import the new card
import UpcomingEventsCard from './components/UpcomingEventsCard/UpcomingEventsCard'; // Import UpcomingEventsCard
import GroupProjectsCard from './components/GroupProjectsCard/GroupProjectsCard';

import './CoursesPage.css';

const filteredSubjects = [
    { id: 1, name: 'Math 101' },
    { id: 2, name: 'History 201' },
    { id: 3, name: 'Biology 101' },
    // Add more subjects as needed
];

const CoursesPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSubject, setSelectedSubject] = useState(null);

    return (
        <div className="courses-page">
            <Sidebar />
            <div className="subject-card-container">
                <div className="container mx-auto py-10">
                    <h1 className="search-title">My Subjects and Courses</h1>

                    {!selectedSubject ? (
                        <>
                            {/* Search bar and input */}
                            <div className="search-container">
                                <div className="search-input-container">
                                    <Search className="search-icon" />
                                    <input
                                        type="text"
                                        placeholder="Search subjects..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="search-input"
                                    />
                                </div>
                            </div>

                            {/* Subject Cards Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                <SubjectCard />
                            </div>

                            {/* Separator (if needed) */}
                            <div className="my-8">
                                <hr />
                            </div>
                        </>
                    ) : (
                        <div>
                            <h2 className="text-2xl">{selectedSubject.name}</h2>
                            {/* Add more content for selected subject */}
                        </div>
                    )}

                    {/* Cards Layout (Featured, Announcements, Events) */}
                    <div className="card-container">
                        <div className="feature-card-container">
                            <FeaturedResourcesCard />
                        </div>
                        <div className="announcement-card-container">
                            <RecentAnnouncementsCard />
                        </div>
                        <div className="events-card-container">
                            <UpcomingEventsCard />
                        </div>
                    </div>

                    {/* Group Projects Card placed below other cards */}
                    <div className="groupproject-card-container">
                        <GroupProjectsCard />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CoursesPage;
