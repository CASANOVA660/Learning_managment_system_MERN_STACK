import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axiosRequest from "../../../lib/AxiosConfig";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../Dashbord/StudentDashbord/cards/cardinfo";
import './DepartmentsPage.css';

const DepartmentsPage = () => {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await axiosRequest.get("/departments");
                setDepartments(response.data);
            } catch (err) {
                setError("Error fetching departments");
            } finally {
                setLoading(false);
            }
        };

        fetchDepartments();
    }, []);

    const handleCardClick = (id) => {
        navigate(`/departments/${id}`); // Navigate to the department's classes
    };

    if (loading) {
        return <div className="loading">Loading departments...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="departments-page">
            <h1 className="page-header">University Departments</h1>
            <div className="departments-grid">
                {departments.map(department => (
                    <Card key={department._id} className="department-card" onClick={() => handleCardClick(department._id)}>
                        <CardHeader>
                            <CardTitle>{department.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                <p>Classes: {department.classes.length}</p>
                                <p>Created At: {new Date(department.createdAt).toLocaleDateString()}</p>
                            </CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default DepartmentsPage;