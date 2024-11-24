import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosRequest from '../../../../../../../lib/AxiosConfig';
import { base64UrlDecode } from '../../../../../../../helpers/base64Helper';
import './AllAssignments.css';

const AllAssignments = () => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const getStudentIdFromToken = () => {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No authentication token found');

        try {
            const [, payloadBase64] = token.split('.');
            const payloadJson = base64UrlDecode(payloadBase64);
            const payload = JSON.parse(payloadJson);
            return payload.id;
        } catch (error) {
            console.error('Error decoding token:', error);
            throw new Error('Invalid token format');
        }
    };

    useEffect(() => {
        fetchAllAssignments();
    }, []);

    const fetchAllAssignments = async () => {
        try {
            const studentId = getStudentIdFromToken();
            const response = await axiosRequest.get(`/assignments/student/${studentId}`);
            setAssignments(response.data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            console.log(err);
            setLoading(false);
        }
    };

    const handleAssignmentClick = (assignment) => {
        // Navigate to the course's assignment section
        navigate(`/assignments/${assignment.id}`);
    };

    const getStatusClass = (status, dueDate) => {
        if (new Date(dueDate) < new Date()) return 'late';
        return status.toLowerCase().replace(' ', '-');
    };

    if (loading) return <div className="loading">Loading assignments...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="all-assignments-container">
            <h1>All Assignments</h1>

            <div className="assignments-grid">
                {assignments.map((assignment) => (
                    <div
                        key={assignment.id}
                        className="assignment-card"
                        onClick={() => handleAssignmentClick(assignment)}
                    >
                        <div className="assignment-header">
                            <h3>{assignment.title}</h3>
                            <span className={`status-badge ${getStatusClass(assignment.status, assignment.dueDate)}`}>
                                {assignment.status}
                            </span>
                        </div>

                        <div className="assignment-details">
                            <p className="course-name">Course: {assignment.courseName}</p>
                            <p className="subject-name">Subject: {assignment.subjectName}</p>
                            <p className="due-date">
                                Due: {new Date(assignment.dueDate).toLocaleDateString()}
                            </p>
                        </div>

                        <div className="assignment-footer">
                            <div className="progress-indicator">
                                {assignment.status === 'Completed' ? (
                                    <span className="completed-text">✓ Submitted</span>
                                ) : (
                                    <span className="pending-text">Pending</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllAssignments;