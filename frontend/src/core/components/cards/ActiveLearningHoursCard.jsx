import React from 'react';
import { Card } from 'react-bootstrap';
import { FaClock } from 'react-icons/fa';
import './ActiveLearningHoursCard.css';

const ActiveLearningHoursCard = ({ hours, percentageChange }) => {
    const trendColor = percentageChange >= 0 ? 'text-success' : 'text-danger';
    const trendIcon = percentageChange >= 0 ? '▲' : '▼';

    return (
        <Card className="active-learning-hours-card shadow-sm">
            <Card.Body className="d-flex align-items-center">
                <div className="icon-wrapper me-3">
                    <FaClock className="hours-icon" />
                </div>
                <div className="text-wrapper">
                    <h5>Active Learning Hours</h5>
                    <h3>{hours} hrs</h3>
                    <span className={`trend ${trendColor}`}>
                        {trendIcon} {Math.abs(percentageChange)}% from last month
                    </span>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ActiveLearningHoursCard;
