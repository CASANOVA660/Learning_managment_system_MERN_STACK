import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosRequest from '../../../../lib/AxiosConfig';
import { base64UrlDecode } from '../../../../helpers/base64Helper';
import './StudyTracker.css';

const StudyTracker = () => {
    const [studySessions, setStudySessions] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTimer, setActiveTimer] = useState(null);
    const [statistics, setStatistics] = useState({
        totalHours: 0,
        weeklyHours: 0,
        mostStudiedCourse: null,
        streakDays: 0
    });

    // Track current study session
    const [currentSession, setCurrentSession] = useState({
        courseId: null,
        startTime: null,
        duration: 0,
        isActive: false
    });

    useEffect(() => {
        fetchStudyData();
    }, []);

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

    const fetchStudyData = async () => {
        try {
            const studentId = getStudentIdFromToken();
            const [sessionsRes, coursesRes] = await Promise.all([
                axiosRequest.get(`/study-sessions/student/${studentId}`),
                axiosRequest.get(`/chapters`)
            ]);

            setStudySessions(sessionsRes.data);
            setCourses(coursesRes.data);
            calculateStatistics(sessionsRes.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching study data:', error);
            // Set empty arrays to prevent undefined errors
            setStudySessions([]);
            setCourses([]);
            setLoading(false);
        }
    };

    const calculateStreak = (sessions) => {
        if (!sessions.length) return 0;

        // Sort sessions by date in descending order
        const sortedSessions = [...sessions].sort((a, b) =>
            new Date(b.date) - new Date(a.date)
        );

        let streak = 1;
        let currentDate = new Date(sortedSessions[0].date);
        currentDate.setHours(0, 0, 0, 0);

        // Check if there's a session today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (currentDate < today) return 0;

        // Count consecutive days
        for (let i = 1; i < sortedSessions.length; i++) {
            const sessionDate = new Date(sortedSessions[i].date);
            sessionDate.setHours(0, 0, 0, 0);

            const dayDifference = Math.floor(
                (currentDate - sessionDate) / (1000 * 60 * 60 * 24)
            );

            if (dayDifference === 1) {
                streak++;
                currentDate = sessionDate;
            } else if (dayDifference > 1) {
                break;
            }
        }

        return streak;
    };


    const calculateStatistics = (sessions) => {
        // Calculate total hours
        const totalHours = sessions.reduce((acc, session) => acc + session.duration, 0) / 60;

        // Calculate weekly hours
        const weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - 7);
        const weeklyHours = sessions
            .filter(session => new Date(session.date) > weekStart)
            .reduce((acc, session) => acc + session.duration, 0) / 60;

        // Find most studied course
        const courseStudyTime = {};
        sessions.forEach(session => {
            courseStudyTime[session.courseId] = (courseStudyTime[session.courseId] || 0) + session.duration;
        });
        const mostStudiedCourse = Object.entries(courseStudyTime)
            .sort(([, a], [, b]) => b - a)[0]?.[0];

        setStatistics({
            totalHours: Math.round(totalHours),
            weeklyHours: Math.round(weeklyHours),
            mostStudiedCourse,
            streakDays: calculateStreak(sessions)
        });
    };

    const startStudySession = (courseId) => {
        setCurrentSession({
            courseId,
            startTime: new Date(),
            duration: 0,
            isActive: true
        });

        setActiveTimer(setInterval(() => {
            setCurrentSession(prev => ({
                ...prev,
                duration: prev.duration + 1
            }));
        }, 60000)); // Update every minute
    };

    const endStudySession = async () => {
        if (currentSession.isActive) {
            clearInterval(activeTimer);
            try {
                const sessionData = {
                    courseId: currentSession.courseId,
                    duration: currentSession.duration,
                    date: currentSession.startTime,
                    studentId: getStudentIdFromToken()
                };

                await axiosRequest.post('/study-sessions', sessionData);
                await fetchStudyData();

                setCurrentSession({
                    courseId: null,
                    startTime: null,
                    duration: 0,
                    isActive: false
                });
            } catch (error) {
                console.error('Error saving study session:', error);
            }
        }
    };

    return (
        <div className="study-tracker-container">
            <div className="statistics-section">
                <h2>Study Statistics</h2>
                <div className="stats-grid">
                    <div className="stat-card">
                        <h3>Total Study Hours</h3>
                        <p>{statistics.totalHours}h</p>
                    </div>
                    <div className="stat-card">
                        <h3>Weekly Hours</h3>
                        <p>{statistics.weeklyHours}h</p>
                    </div>
                    <div className="stat-card">
                        <h3>Study Streak</h3>
                        <p>{statistics.streakDays} days</p>
                    </div>
                    <div className="stat-card">
                        <h3>Most Studied</h3>
                        <p>{courses.find(c => c.id === statistics.mostStudiedCourse)?.name || 'N/A'}</p>
                    </div>
                </div>
            </div>

            <div className="active-session-section">
                {currentSession.isActive ? (
                    <div className="active-timer">
                        <h3>Currently Studying</h3>
                        <p className="course-name">
                            {courses.find(c => c.id === currentSession.courseId)?.name}
                        </p>
                        <p className="timer">{Math.floor(currentSession.duration)} minutes</p>
                        <button onClick={endStudySession} className="end-button">
                            End Session
                        </button>
                    </div>
                ) : (
                    <div className="course-list">
                        <h3>Start Studying</h3>
                        {courses.map(course => (
                            <button
                                key={course.id}
                                onClick={() => startStudySession(course.id)}
                                className="course-button"
                            >
                                {course.name}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="history-section">
                <h2>Study History</h2>
                <div className="history-list">
                    {studySessions.map(session => (
                        <div key={session.id} className="history-item">
                            <div className="session-info">
                                <h4>{courses.find(c => c.id === session.courseId)?.name}</h4>
                                <p>{new Date(session.date).toLocaleDateString()}</p>
                            </div>
                            <p className="duration">{session.duration} minutes</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StudyTracker;