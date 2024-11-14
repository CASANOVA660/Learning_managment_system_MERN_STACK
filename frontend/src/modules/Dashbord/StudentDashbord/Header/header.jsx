import React from "react";
import { FaGraduationCap, FaBell, FaUser, FaSearch } from "react-icons/fa";
import "./Header.css";

const Header = () => {
    return (
        <div className="header">
            <div className="header-left">

                <span className="title">Student Dashboard</span> {/* Updated title */}
            </div>
            <div className="header-center">
                <FaSearch className="search-icon" />
                <input
                    type="text"
                    placeholder="Search courses, assignments..."
                    className="search-input"
                />
            </div>
            <div className="header-right">
                <FaBell className="icon" />
                <FaUser className="icon" />
            </div>
        </div>
    );
};

export default Header;
