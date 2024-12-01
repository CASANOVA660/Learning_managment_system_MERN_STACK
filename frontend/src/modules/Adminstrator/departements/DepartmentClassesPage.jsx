import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import axiosRequest from "../../../lib/AxiosConfig";
import AddClassModal from "./components/AddClassModal"; // Import the modal component
import './DepartmentClassesPage.css';

const DepartmentClassesPage = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Initialize useNavigate
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axiosRequest.get(`/departments/${id}`);
                setClasses(response.data.classes);
            } catch (err) {
                setError("Error fetching classes");
            } finally {
                setLoading(false);
            }
        };

        fetchClasses();
    }, [id]);

    const handleClassClick = (classId) => {
        navigate(`/classes/${classId}`); // Navigate to the class details page
    };

    const handleClassAdded = (newClass) => {
        setClasses([...classes, newClass]); // Add the new class to the state
    };

    if (loading) {
        return <div className="loading">Loading classes...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="classes-page">
            <h1 className="page-header">Classes for Department</h1>
            <button onClick={() => setShowModal(true)} className="add-class-button">Add Class</button>
            <div className="classes-grid">
                {classes.map(classItem => (
                    <div key={classItem._id} className="class-card" onClick={() => handleClassClick(classItem._id)}>
                        <h2>{classItem.name}</h2>
                        <p>Academic Year: {classItem.academicYear}</p>
                        <p>Capacity: {classItem.capacity}</p>
                    </div>
                ))}
            </div>
            {showModal && (
                <AddClassModal
                    onClose={() => setShowModal(false)}
                    departmentId={id}
                    onClassAdded={handleClassAdded}
                />
            )}
        </div>
    );
};

export default DepartmentClassesPage;