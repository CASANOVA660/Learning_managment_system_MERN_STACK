import React from "react";
import {
    GraduationCap,
    Layout,
    Star,
    Trophy,
    Book,
    Clock,
    Users,
    Bookmark,
    CalendarDays,
    MessageSquare,
    MessageCircle,
    Globe,
} from "lucide-react";
import { Link } from "react-router-dom";
import './sideBar.css'

const Sidebar = () => {
    const links = [
        { icon: Layout, label: "Dashboard", href: "/studentDashbord" },
        { icon: Star, label: "Courses", href: "/courses" },
        { icon: Trophy, label: "Achievements", href: "#" },
        { icon: Book, label: "Assignments", href: "/assignments" },
        { icon: Clock, label: "Study Tracker", href: "/study-tracker" },
        { icon: Users, label: "Classmates", href: "#" },
        { icon: Bookmark, label: "Clubs", href: "#" },
        { icon: CalendarDays, label: "Events", href: "#" },
        { icon: MessageSquare, label: "Forum", href: "#" },
        { icon: MessageCircle, label: "Class Chat", href: "#" },
        { icon: Globe, label: "University Chat", href: "#" },
    ];

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <GraduationCap className="icon" />
                <span className="title">Student Portal</span>
            </div>
            <nav className="sidebar-nav">
                {links.map(({ icon: Icon, label, href }) => (
                    <Link key={label} to={href} className="sidebar-link">
                        <Icon className="icon" />
                        {label}
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;
