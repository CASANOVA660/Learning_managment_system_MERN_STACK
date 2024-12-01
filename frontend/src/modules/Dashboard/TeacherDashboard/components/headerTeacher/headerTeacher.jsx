import React from 'react';
import './headerTeacher.css';

const Header = () => {
    return (
        <header className="dashboard-header">
            <div className="header-left">
                <h1>Teacher Dashboard</h1>
            </div>
            <div className="header-right">
                <div className="search-bar">
                    <input type="search" placeholder="Search..." />
                </div>
                <div className="notifications">
                    <span className="notification-icon">🔔</span>
                    <span className="notification-badge">3</span>
                </div>
                <div className="profile">
                    <img src="/default-avatar.png" alt="Profile" />
                    <span>Dr. Smith</span>
                </div>
            </div>
        </header>
    );
};

export default Header;