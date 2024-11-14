import React from 'react';
import { Card } from 'react-bootstrap';
import { FaClipboardCheck } from 'react-icons/fa';
import './AssignmentsCompletedCard.css';

const AssignmentsCompletedCard = ({ completedAssignments, percentageChange }) => {
    const trendColor = percentageChange >= 0 ? 'text-success' : 'text-danger';
    const trendIcon = percentageChange >= 0 ? '▲' : '▼';

    return (
        <Card className="assignments-completed-card shadow-sm">
            <Card.Body className="d-flex align-items-center">
                <div className="icon-wrapper me-3">
                    <FaClipboardCheck className="assignment-icon" />
                </div>
                <div className="text-wrapper">
                    <h5>Assignments Completed</h5>
                    <h3>{completedAssignments}</h3>
                    <span className={`trend ${trendColor}`}>
                        {trendIcon} {Math.abs(percentageChange)}% from last month
                    </span>
                </div>
            </Card.Body>
        </Card>
    );
};

export default AssignmentsCompletedCard;
