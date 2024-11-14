import React from 'react';
import { Card } from 'react-bootstrap';
import { FaEye } from 'react-icons/fa';
import './TotalCoursesViewedCard.css'; // Custom styles for this card

const TotalCoursesViewedCard = ({ totalCoursesViewed, percentageChange }) => {
    const trendColor = percentageChange >= 0 ? 'text-success' : 'text-danger';
    const trendIcon = percentageChange >= 0 ? '▲' : '▼';

    return (
        <Card className="total-courses-viewed-card shadow-sm">
            <Card.Body className="d-flex align-items-center">
                <div className="icon-wrapper me-3">
                    <FaEye className="eye-icon" />
                </div>
                <div className="text-wrapper">
                    <h5>Total Courses Viewed</h5>
                    <h3>{totalCoursesViewed}</h3>
                    <span className={`trend ${trendColor}`}>
                        {trendIcon} {Math.abs(percentageChange)}% from last week
                    </span>
                </div>
            </Card.Body>
        </Card>
    );
};

export default TotalCoursesViewedCard;
