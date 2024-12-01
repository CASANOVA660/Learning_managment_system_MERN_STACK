import React, { useState, useEffect } from "react";
import axiosRequest from "../../../../../lib/AxiosConfig";
import { FaGraduationCap, FaUsers, FaBook, FaChalkboardTeacher } from "react-icons/fa";
import { Modal, Button, Form } from "react-bootstrap";
import SideBar from '../sideBarT/sideBarT'; // Import the Sidebar component
import "./SubjectsPage.css";

const SubjectsPageT = () => {
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [newSubject, setNewSubject] = useState({ name: "", description: "", classId: "", image: "" });

    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        try {
            const response = await axiosRequest.get("/classes");
            setClasses(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching classes:", error);
            setLoading(false);
        }
    };

    const fetchSubjects = async (classId) => {
        try {
            const response = await axiosRequest.get(`/classes/${classId}/subjects`);
            setSubjects(response.data);
        } catch (error) {
            console.error("Error fetching subjects:", error);
        }
    };

    const handleClassSelect = (classData) => {
        setSelectedClass(classData);
        fetchSubjects(classData.id);
    };

    const handleModalClose = () => setShowModal(false);
    const handleModalShow = () => setShowModal(true);

    const handleFormChange = (e) => {
        setNewSubject({ ...newSubject, [e.target.name]: e.target.value });
    };

    return (
        <div className="subjects-page-container">
            <SideBar /> {/* Include the Sidebar */}
            <div className="content-wrapper">
                <div className="page-header">
                    <h1>Class Management</h1>
                    <p>Select a class to manage its subjects and courses</p>
                </div>

                <div className="classes-section">
                    <div className="section-header">
                        <FaGraduationCap className="section-icon" />
                        <h2>Available Classes</h2>
                    </div>
                    {loading ? (
                        <div className="loading-spinner">
                            <div className="spinner"></div>
                            <p>Loading classes...</p>
                        </div>
                    ) : (
                        <div className="class-list">
                            {classes.map((classItem) => (
                                <div
                                    key={classItem.id}
                                    className={`class-item ${selectedClass?.id === classItem.id ? "active" : ""}`}
                                    onClick={() => handleClassSelect(classItem)}
                                >
                                    <div className="class-item-header">
                                        <FaUsers className="class-icon" />
                                        <h3>{classItem.name}</h3>
                                    </div>
                                    <div className="class-details">
                                        <div className="detail-item">
                                            <FaChalkboardTeacher />
                                            <span>{classItem.department}</span>
                                        </div>
                                        <div className="detail-item">
                                            <FaUsers />
                                            <span>{classItem.students.length} Students</span>
                                        </div>
                                        <div className="detail-item">
                                            <FaBook />
                                            <span>{classItem.subjects.length} Subjects</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {selectedClass && (
                    <div className="subjects-section">
                        <div className="section-header">
                            <FaBook className="section-icon" />
                            <h2>Subjects for {selectedClass.name}</h2>
                        </div>
                        <div className="subjects-grid">
                            {subjects.map((subject) => (
                                <div key={subject.id} className="subject-card">
                                    <div className="subject-image">
                                        <img src={subject.image} alt={subject.name} />
                                        <div className="subject-overlay">
                                            <h3>{subject.name}</h3>
                                        </div>
                                    </div>
                                    <div className="subject-content">
                                        <p>{subject.description}</p>
                                        <div className="subject-actions">
                                            <button className="btn-manage">Manage Course</button>
                                            <button className="btn-view">View Details</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubjectsPageT;