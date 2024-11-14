import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaBook, FaChartLine } from 'react-icons/fa'; // Icons for title and analytics
import './SeeCoursesCard.css'

const SeeCoursesCard = () => {
    return (
        <Card className="see-courses-card shadow-sm mb-4">
            <Card.Body>
                <div className="d-flex align-items-center mb-3">
                    <FaBook className="text-primary me-2" size={24} />
                    <h5 className="mb-0">See Courses</h5>
                </div>

                <div className="analytics-section mb-4">
                    <div className="analytics-item">
                        <FaChartLine className="icon" />
                        <span>Total Courses:</span>
                        <strong>15</strong>
                    </div>
                    <div className="analytics-item">
                        <FaChartLine className="icon" />
                        <span>Enrolled:</span>
                        <strong>8</strong>
                    </div>
                    <div className="analytics-item">
                        <FaChartLine className="icon" />
                        <span>Completion Rate:</span>
                        <strong>60%</strong>
                    </div>
                </div>

                <Button variant="outline-primary" className="w-100">See All Courses</Button>
            </Card.Body>
        </Card>
    );
};

export default SeeCoursesCard;
