import React, { useState } from 'react';
import './AnnouncementsT.css';

const Announcements = () => {
    const [announcements, setAnnouncements] = useState([
        {
            id: 1,
            title: "Exam Schedule Update",
            content: "Final exams for Mathematics will be held next week.",
            date: "2024-03-15",
            priority: "high"
        },
        {
            id: 2,
            title: "Parent-Teacher Meeting",
            content: "PTM scheduled for next Friday at 3 PM.",
            date: "2024-03-20",
            priority: "medium"
        }
    ]);

    const [newAnnouncement, setNewAnnouncement] = useState({
        title: '',
        content: '',
        priority: 'medium'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setAnnouncements(prev => [...prev, {
            id: prev.length + 1,
            ...newAnnouncement,
            date: new Date().toISOString().split('T')[0]
        }]);
        setNewAnnouncement({ title: '', content: '', priority: 'medium' });
    };

    return (
        <div className="announcements-container">
            <div className="announcements-header">
                <h2>Announcements</h2>
                <button className="new-announcement-btn">+ New Announcement</button>
            </div>

            <div className="announcements-list">
                {announcements.map(announcement => (
                    <div className={`announcement-card priority-${announcement.priority}`} key={announcement.id}>
                        <div className="announcement-header">
                            <h3>{announcement.title}</h3>
                            <span className="date">{announcement.date}</span>
                        </div>
                        <p>{announcement.content}</p>
                        <div className="announcement-footer">
                            <span className={`priority-badge ${announcement.priority}`}>
                                {announcement.priority}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <form className="announcement-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Announcement Title"
                    value={newAnnouncement.title}
                    onChange={e => setNewAnnouncement(prev => ({ ...prev, title: e.target.value }))}
                />
                <textarea
                    placeholder="Announcement Content"
                    value={newAnnouncement.content}
                    onChange={e => setNewAnnouncement(prev => ({ ...prev, content: e.target.value }))}
                />
                <select
                    value={newAnnouncement.priority}
                    onChange={e => setNewAnnouncement(prev => ({ ...prev, priority: e.target.value }))}
                >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                </select>
                <button type="submit">Post Announcement</button>
            </form>
        </div>
    );
};

export default Announcements;