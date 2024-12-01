import React from 'react';
import { Link } from 'react-router-dom';
import './sideBarT.css';

const SideBar = () => {
    const menuItems = [
        { title: "dashbord", icon: "📚", path: "/teacherDashbord" },
        { title: "Assignments", icon: "📝", path: "/teacherassiment" },
        { title: "Classes", icon: "👥", path: "/subjectsTeacher" },
        { title: "Clubs", icon: "📢", path: "/clubs" },
        { title: "Online Sessions", icon: "💻", path: "/live-session" }
    ];

    return (
        <div className="sidebar">
            <div className="logo">
                <h2>UniLMS</h2>
            </div>
            <nav className="nav-menu">
                {menuItems.map((item, index) => (
                    <Link to={item.path} key={index} className="nav-item">
                        <span className="nav-icon">{item.icon}</span>
                        <span className="nav-title">{item.title}</span>
                    </Link>
                ))}
            </nav>
            <div className="sidebar-footer">
                <Link to="/settings" className="nav-item">
                    <span className="nav-icon">⚙️</span>
                    <span className="nav-title">Settings</span>
                </Link>
                <Link to="/logout" className="nav-item">
                    <span className="nav-icon">🚪</span>
                    <span className="nav-title">Logout</span>
                </Link>
            </div>
        </div>
    );
};

export default SideBar;