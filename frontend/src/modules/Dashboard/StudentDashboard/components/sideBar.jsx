import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Navbar, Nav, Button, Container, Row, Col, Card, Badge } from "react-bootstrap";
import "./sideBar.css"
import { BiArrowToLeft, BiArrowToRight } from 'react-icons/bi'; // Import icons
import BasicLineChart from "../../../../core/components/charts/BasicLineChart"

const sideBar = () => {
    const [isOpen, setIsOpen] = useState(true); // State to manage sidebar visibility

    const toggleSidebar = () => {
        setIsOpen(!isOpen); è
    };

    return (
        <nav className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            {isOpen && (
                <div className="sidebar-header">
                    <img src="https://preview.webpixels.io/web/img/logos/clever-primary.svg" alt="Brand Logo" className="brand-logo" />
                </div>
            )}
            <button className="toggle-btn" onClick={toggleSidebar}>
                {isOpen ? '<' : '>'}
            </button>
            {isOpen && (
                <ul className="sidebar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <i className="bi bi-house"></i> Dashboard
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <i className="bi bi-bar-chart"></i> Analytics
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <i className="bi bi-chat"></i> Messages
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <i className="bi bi-bookmarks"></i> Collections
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <i className="bi bi-people"></i> Users
                        </a>
                    </li>
                </ul>
            )}
        </nav>
    );
};

export default sideBar;
