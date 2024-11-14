import React from 'react';
import { Card, ProgressBar } from 'react-bootstrap';
import { FaCalendarCheck } from 'react-icons/fa';

const WeeklyEngagementCard = ({ activeDays }) => {
    const engagementPercentage = (activeDays / 7) * 100;

    return (
        <Card className="weekly-engagement-card shadow-sm">
            <Card.Body className="d-flex align-items-center">
                <div className="icon-wrapper me-3">
                    <FaCalendarCheck className="engagement-icon" />
                </div>
                <div className="text-wrapper">
                    <h5>Weekly Engagement</h5>
                    <h3>{activeDays} / 7 days</h3>
                    <ProgressBar now={engagementPercentage} className="engagement-progress" />
                </div>
            </Card.Body>
        </Card>
    );
};

export default WeeklyEngagementCard;
