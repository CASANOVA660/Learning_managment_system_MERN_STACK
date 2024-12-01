import React, { useState, useEffect } from 'react';
import axiosRequest from '../../../../lib/AxiosConfig';
import { base64UrlDecode } from '../../../../helpers/base64Helper';
import './AchievementsPage.css';

const Achievements = () => {
    const [achievements, setAchievements] = useState([]);
    const [userAchievements, setUserAchievements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stats, setStats] = useState({
        totalEarned: 0,
        recentlyEarned: [],
        progress: {}
    });

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
        fetchAchievements();
    }, []);

    const fetchAchievements = async () => {
        try {
            const studentId = getStudentIdFromToken();
            const [achievementsRes, userAchievementsRes] = await Promise.all([
                axiosRequest.get('/achievements'),
                axiosRequest.get(`/achievements/student/${studentId}`)
            ]);

            setAchievements(achievementsRes.data);
            setUserAchievements(userAchievementsRes.data);
            calculateStats(achievementsRes.data, userAchievementsRes.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching achievements:', error);
            setError(error.message);
            setLoading(false);
        }
    };

    const calculateStats = (allAchievements, userAchievements) => {
        const earned = userAchievements.filter(ua => ua.completed);
        const recent = earned
            .sort((a, b) => new Date(b.earnedAt) - new Date(a.earnedAt))
            .slice(0, 3);

        const progressMap = {};
        allAchievements.forEach(achievement => {
            const userProgress = userAchievements.find(ua => ua.achievementId === achievement.id);
            progressMap[achievement.id] = {
                current: userProgress?.progress || 0,
                target: achievement.target
            };
        });

        setStats({
            totalEarned: earned.length,
            recentlyEarned: recent,
            progress: progressMap
        });
    };

    const getAchievementCategory = (achievement) => {
        const categories = {
            ASSIGNMENT: 'Assignments',
            COURSE: 'Courses',
            STUDY: 'Study Time',
            QUIZ: 'Quizzes',
            STREAK: 'Streaks'
        };
        return categories[achievement.category] || 'General';
    };

    if (loading) return <div className="loading">Loading achievements...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="achievements-container">
            <div className="achievements-header">
                <h1>Achievements</h1>
                <div className="achievement-stats">
                    <div className="stat">
                        <span className="stat-value">{stats.totalEarned}</span>
                        <span className="stat-label">Earned</span>
                    </div>
                    <div className="stat">
                        <span className="stat-value">{achievements.length}</span>
                        <span className="stat-label">Total</span>
                    </div>
                </div>
            </div>

            <div className="recent-achievements">
                <h2>Recently Earned</h2>
                <div className="recent-grid">
                    {stats.recentlyEarned.map(achievement => (
                        <div key={achievement.id} className="recent-achievement">
                            <div className="achievement-icon">🏆</div>
                            <h3>{achievement.title}</h3>
                            <p className="earned-date">
                                {new Date(achievement.earnedAt).toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="achievements-grid">
                {Object.entries(
                    achievements.reduce((acc, achievement) => {
                        const category = getAchievementCategory(achievement);
                        if (!acc[category]) acc[category] = [];
                        acc[category].push(achievement);
                        return acc;
                    }, {})
                ).map(([category, categoryAchievements]) => (
                    <div key={category} className="category-section">
                        <h2>{category}</h2>
                        <div className="category-achievements">
                            {categoryAchievements.map(achievement => {
                                const userAchievement = userAchievements.find(
                                    ua => ua.achievementId === achievement.id
                                );
                                const progress = stats.progress[achievement.id];

                                return (
                                    <div
                                        key={achievement.id}
                                        className={`achievement-card ${userAchievement?.completed ? 'completed' : ''}`}
                                    >
                                        <div className="achievement-content">
                                            <div className="achievement-icon">
                                                {achievement.icon || '🏆'}
                                            </div>
                                            <div className="achievement-info">
                                                <h3>{achievement.title}</h3>
                                                <p>{achievement.description}</p>
                                                {progress && !userAchievement?.completed && (
                                                    <div className="progress-bar">
                                                        <div
                                                            className="progress-fill"
                                                            style={{
                                                                width: `${(progress.current / progress.target) * 100}%`
                                                            }}
                                                        />
                                                        <span className="progress-text">
                                                            {progress.current}/{progress.target}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        {userAchievement?.completed && (
                                            <div className="completion-date">
                                                Earned: {new Date(userAchievement.earnedAt).toLocaleDateString()}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Achievements;