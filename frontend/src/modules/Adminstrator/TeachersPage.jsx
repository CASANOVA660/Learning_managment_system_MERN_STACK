import React, { useState, useEffect } from "react";
import axiosRequest from "../../lib/AxiosConfig";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import './TeachersPage.css'; // Import the CSS file

const TeachersPage = () => {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        try {
            const response = await axiosRequest.get("/teachers"); // Adjust the endpoint as necessary
            setTeachers(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching teachers:", error);
            setLoading(false);
        }
    };

    return (
        <div className="teachers-page-container">
            <h1>Teachers List</h1>
            {loading ? (
                <p>Loading teachers...</p>
            ) : (
                <Table striped bordered hover className="teachers-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Department</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.map((teacher) => (
                            <tr key={teacher.id}>
                                <td>
                                    <Link to={`/teachers/${teacher.id}`} className="teacher-link">{teacher.name}</Link>
                                </td>
                                <td>{teacher.email}</td>
                                <td>{teacher.department}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default TeachersPage;