import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosRequest from '../../../../../../../lib/AxiosConfig';
import { base64UrlDecode } from '../../../../../../../helpers/base64Helper';
import './Assignments.css';

const Assignments = () => {
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [answers, setAnswers] = useState('');
    const [submitStatus, setSubmitStatus] = useState('');
    const { id: courseId } = useParams();


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
        fetchAssignments();
    }, [courseId]);

    const fetchAssignments = async () => {
        try {
            const response = await axiosRequest.get(`/assignments/course/${courseId}`);
            setAssignments(response.data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleAssignmentClick = async (assignment) => {
        try {
            const studentId = getStudentIdFromToken();
            const response = await axiosRequest.get(`/assignments/${assignment.id}/response?studentId=${studentId}`);
            if (response.data.response) {
                setAnswers(response.data.response.answers[0]?.text || '');
            } else {
                setAnswers('');
            }
            setSelectedAssignment(assignment);
        } catch (err) {
            console.error('Error fetching response:', err);
            setSelectedAssignment(assignment);
        }
    };

    const handleSubmit = async () => {
        try {
            setSubmitStatus('submitting');
            const studentId = getStudentIdFromToken();
            await axiosRequest.post(`/assignments/${selectedAssignment.id}/submit`, {
                studentId,
                answers: [answers]
            });

            await fetchAssignments();
            setSubmitStatus('success');
            setTimeout(() => setSubmitStatus(''), 3000);
        } catch (err) {
            setSubmitStatus('error');
            console.error('Error submitting assignment:', err);
        }
    };

    if (loading) {
        return <div className="loading">Loading assignments...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    if (selectedAssignment) {
        const isPastDeadline = new Date(selectedAssignment.dueDate) < new Date();
        const canSubmit = !isPastDeadline && selectedAssignment.status !== 'Completed';

        return (
            <div className="assignment-detail-container">
                <h2>{selectedAssignment.title}</h2>
                <div className="assignment-metadata">
                    <p className="due-date">Due: {new Date(selectedAssignment.dueDate).toLocaleDateString()}</p>
                    <span className={`status-badge ${selectedAssignment.status.toLowerCase()}`}>
                        {selectedAssignment.status}
                    </span>
                </div>

                <div className="assignment-description">
                    <p>{selectedAssignment.description}</p>
                </div>

                {selectedAssignment.questions && (
                    <div className="questions-section">
                        <h3>Questions:</h3>
                        <ul className="questions-list">
                            {selectedAssignment.questions.map((question, index) => (
                                <li key={index}>{question}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="answer-section">
                    <h3>Your Answer:</h3>
                    <textarea
                        value={answers}
                        onChange={(e) => setAnswers(e.target.value)}
                        placeholder="Type your answer here..."
                        rows={10}
                        className="answer-input"
                        disabled={!canSubmit}
                    />
                </div>

                <div className="assignment-actions">
                    <button className="secondary-button" onClick={() => setSelectedAssignment(null)}>
                        Back to Assignments
                    </button>
                    <div className="right-actions">
                        <button className="pdf-button">
                            <span className="pdf-icon">📄</span> View PDF
                        </button>
                        {canSubmit && (
                            <button
                                className="submit-button"
                                onClick={handleSubmit}
                                disabled={submitStatus === 'submitting'}
                            >
                                {submitStatus === 'submitting' ? 'Submitting...' : 'Submit Assignment'}
                            </button>
                        )}
                    </div>
                </div>

                {submitStatus === 'success' && (
                    <div className="success-message">Assignment submitted successfully!</div>
                )}

                {submitStatus === 'error' && (
                    <div className="error-message">Error submitting assignment. Please try again.</div>
                )}

                {isPastDeadline && (
                    <div className="deadline-message">Deadline has passed</div>
                )}
            </div>
        );
    }

    return (
        <div className="assignments-wrapper">
            <h2>Assignments</h2>
            <div className="assignments-list">
                {assignments.map((assignment) => (
                    <div
                        key={assignment.id}
                        className="assignment-item"
                        onClick={() => handleAssignmentClick(assignment)}
                    >
                        <div className="assignment-main-info">
                            <h3>{assignment.title}</h3>
                            <p className="due-date">
                                Due: {new Date(assignment.dueDate).toLocaleDateString()}
                            </p>
                        </div>
                        <span className={`status-tag ${assignment.status.toLowerCase()}`}>
                            {assignment.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Assignments;