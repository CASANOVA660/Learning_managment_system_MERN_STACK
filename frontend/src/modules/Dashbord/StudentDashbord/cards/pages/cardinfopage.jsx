import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../cardinfo";
import axiosRequest from "../../../../../lib/AxiosConfig";
import { Clock, Users, BookOpen, ChevronRight } from "lucide-react";
import { base64UrlDecode } from "../../../../../helpers/base64Helper";
import "./cardinfopage.css";

const CurrentClassCard = () => {
    const [currentClass, setCurrentClass] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [attendance, setAttendance] = useState(0);
    const [nextClass, setNextClass] = useState(null);
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

    const getCurrentClass = async () => {
        try {
            const now = new Date();
            const currentDay = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][now.getDay()];
            const currentTime = now.toLocaleTimeString('en-US', { hour12: false });

            const studentId = getStudentIdFromToken();
            const response = await axiosRequest.get(`/schedule/${studentId}/current-class`, {
                params: {
                    day: currentDay,
                    time: currentTime
                }
            });

            if (response.data) {
                setCurrentClass(response.data.currentClass);
                setNextClass(response.data.nextClass);
                setAttendance(response.data.attendance || 0);
            }
        } catch (err) {
            setError("Unable to fetch current class");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCurrentClass();
        const interval = setInterval(getCurrentClass, 60000); // Update every minute
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return <Card className="current-class-card loading">Loading...</Card>;
    }

    if (error) {
        return <Card className="current-class-card error">{error}</Card>;
    }

    return (
        <div className="current-class-container">
            <Card className="current-class-card">
                <CardHeader>
                    <div className="card-header-content">
                        <div className="status-indicator">
                            {currentClass ? (
                                <span className="live-status">● LIVE NOW</span>
                            ) : (
                                <span className="no-class">No ongoing class</span>
                            )}
                        </div>
                        <CardTitle>
                            {currentClass ? (
                                currentClass.subject
                            ) : (
                                "No Current Class"
                            )}
                        </CardTitle>
                        {currentClass && (
                            <CardDescription>
                                <div className="class-details">
                                    <span><Users size={16} /> {currentClass.instructor}</span>
                                    <span><BookOpen size={16} /> Room {currentClass.location}</span>
                                    <span><Clock size={16} /> {currentClass.time}</span>
                                </div>
                            </CardDescription>
                        )}
                    </div>
                </CardHeader>
                <CardContent>
                    {currentClass ? (
                        <>
                            <div className="class-stats">
                                <div className="stat-item">
                                    <span className="stat-label">Attendance Rate</span>
                                    <span className="stat-value">{attendance}%</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-label">Duration</span>
                                    <span className="stat-value">90 min</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-label">Progress</span>
                                    <div className="progress-bar">
                                        <div
                                            className="progress"
                                            style={{ width: `${calculateProgress()}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                            <button className="join-class-btn">
                                Join Class
                            </button>
                        </>
                    ) : (
                        <div className="next-class-info">
                            {nextClass ? (
                                <>
                                    <h4>Next Class</h4>
                                    <div className="next-class-details">
                                        <span>{nextClass.subject}</span>
                                        <span>{nextClass.time}</span>
                                        <ChevronRight size={16} />
                                    </div>
                                </>
                            ) : (
                                <p>No more classes scheduled for today</p>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default CurrentClassCard;