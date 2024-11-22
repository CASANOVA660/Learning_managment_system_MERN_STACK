import React, { useState, useEffect } from "react";
import { Card } from "../cards/cardinfo";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axiosRequest from "../../../../lib/AxiosConfig";
import { base64UrlDecode } from "../../../../helpers/base64Helper";
import CreateClassModal from './components/CreateClassModal';
import './schedule.css';

const Schedule = () => {
    const [scheduleData, setScheduleData] = useState(null);
    const [currentWeek, setCurrentWeek] = useState('');
    const [weekOffset, setWeekOffset] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showEventDetails, setShowEventDetails] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const DAY_MAPPING = {
        'MON': 'Monday',
        'TUE': 'Tuesday',
        'WED': 'Wednesday',
        'THU': 'Thursday',
        'FRI': 'Friday',
        'SAT': 'Saturday',
        'SUN': 'Sunday'
    };

    const generateEmptyWeek = (weekOffset = 0) => {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + (weekOffset * 7));

        const startDate = new Date(currentDate);
        startDate.setDate(currentDate.getDate() - currentDate.getDay() + 1);

        const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
        const weekNumber = Math.ceil(((currentDate - startOfYear) / 86400000 + startOfYear.getDay() + 1) / 7);

        const days = [];
        const dayNames = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

        for (let i = 0; i < 7; i++) {
            const dayDate = new Date(startDate);
            dayDate.setDate(startDate.getDate() + i);

            days.push({
                day: dayNames[i],
                date: dayDate,
                classes: [],
                customClasses: []
            });
        }

        return {
            studentId: getStudentIdFromToken(),
            calendarWeek: weekNumber,
            startDate: days[0].date,
            endDate: days[6].date,
            days
        };
    };

    const fetchScheduleData = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const studentId = getStudentIdFromToken();

            const response = await axiosRequest.get(`/schedule/${studentId}/schedule`, {
                params: { weekOffset }
            });

            if (response.data && response.data.schedule) {
                setScheduleData(response.data.schedule);
                setCurrentWeek(`Week ${response.data.weekNumber} - ${formatDate(response.data.startDate)} to ${formatDate(response.data.endDate)}`);
            } else {
                const emptyWeek = generateEmptyWeek(weekOffset);
                setScheduleData(emptyWeek);
                setCurrentWeek(`Week ${emptyWeek.calendarWeek} - ${formatDate(emptyWeek.startDate)} to ${formatDate(emptyWeek.endDate)}`);
            }
        } catch (error) {
            console.error('Error fetching schedule:', error);
            const emptyWeek = generateEmptyWeek(weekOffset);
            setScheduleData(emptyWeek);
            setCurrentWeek(`Week ${emptyWeek.calendarWeek} - ${formatDate(emptyWeek.startDate)} to ${formatDate(emptyWeek.endDate)}`);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchScheduleData();
    }, [weekOffset]);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: '2-digit'
        });
    };

    const formatTimeWithAMPM = (timeString) => {
        if (!timeString) return '';
        try {
            const [hours, minutes] = timeString.split(':');
            const hour = parseInt(hours);
            const ampm = hour >= 12 ? 'PM' : 'AM';
            const formattedHour = hour % 12 || 12;
            return `${formattedHour}:${minutes} ${ampm}`;
        } catch (error) {
            console.error('Error formatting time:', error);
            return timeString;
        }
    };
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

    const handleEventClick = (event, dayIndex, eventIndex, isCustom) => {
        setSelectedEvent({
            ...event,
            dayIndex,
            eventIndex,
            isCustom
        });
        setShowEventDetails(true);
        setIsEditing(false);
    };

    const handleCreateClick = (dayIndex) => {
        setSelectedDay(dayIndex);
        setShowModal(true);
    };

    const handleSaveCustomClass = async (dayIndex, customClass) => {
        try {
            const studentId = getStudentIdFromToken();

            const formattedCustomClass = {
                title: customClass.title,
                taskName: customClass.taskName,
                time: customClass.time,
                description: customClass.description || '',
                colorCode: customClass.colorCode || '#3B82F6',
                isPrivate: true,
                isCustom: true
            };

            const requestData = {
                weekNumber: scheduleData.calendarWeek,
                dayIndex: dayIndex,
                customClass: formattedCustomClass
            };

            console.log('Sending request data:', requestData);

            // Updated to match server.js route
            const response = await axiosRequest.post(`/schedule/${studentId}/schedule/addcustom`, requestData);

            if (response.data && response.data.schedule) {
                console.log('Received updated schedule:', response.data.schedule);
                setScheduleData(response.data.schedule);
                setShowModal(false);
            }
        } catch (error) {
            console.error('Error saving custom class:', error);
        }
    };

    const handleUpdateCustomClass = async (dayIndex, eventIndex, updatedClass) => {
        try {
            const studentId = getStudentIdFromToken();
            const response = await axiosRequest.put(`/schedule/${studentId}/schedule/custom`, {
                weekNumber: scheduleData.calendarWeek,
                dayIndex,
                eventIndex,
                customClass: {
                    ...updatedClass,
                    isPrivate: true,
                    isCustom: true
                }
            });

            if (response.data && response.data.schedule) {
                setScheduleData(response.data.schedule);
            }
            setShowEventDetails(false);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating custom class:', error);
        }
    };

    const handleDeleteCustomClass = async (dayIndex, eventIndex) => {
        try {
            const studentId = getStudentIdFromToken();
            const response = await axiosRequest.delete(`/schedule/${studentId}/schedule/custom`, {
                data: {
                    weekNumber: scheduleData.calendarWeek,
                    dayIndex,
                    eventIndex
                }
            });

            if (response.data && response.data.schedule) {
                setScheduleData(response.data.schedule);
            }
            setShowEventDetails(false);
        } catch (error) {
            console.error('Error deleting custom class:', error);
        }
    };

    const handleExport = () => {
        if (!scheduleData?.days) return;

        const csvRows = [];
        const headers = ['Day', 'Date', 'Type', 'Title/Subject', 'Time', 'Task/Instructor', 'Description/Location'];
        csvRows.push(headers.join(','));

        scheduleData.days.forEach(day => {
            // Add custom classes
            day.customClasses?.forEach(customClass => {
                const row = [
                    DAY_MAPPING[day.day],
                    formatDate(day.date),
                    'Custom Task',
                    customClass.title,
                    formatTimeWithAMPM(customClass.time),
                    customClass.taskName,
                    customClass.description || ''
                ].map(item => `"${item || ''}"`);
                csvRows.push(row.join(','));
            });

            // Add regular classes
            day.classes?.forEach(classItem => {
                const row = [
                    DAY_MAPPING[day.day],
                    formatDate(day.date),
                    'Class',
                    classItem.subject,
                    formatTimeWithAMPM(classItem.time),
                    classItem.instructor,
                    classItem.location
                ].map(item => `"${item || ''}"`);
                csvRows.push(row.join(','));
            });
        });

        const csvContent = csvRows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `schedule_week_${scheduleData.calendarWeek}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };
    const EventDetailsCard = ({ event, onClose }) => {
        if (!event) return null;

        const [editForm, setEditForm] = useState({
            title: event.title || '',
            taskName: event.taskName || '',
            time: event.time || '',
            description: event.description || '',
            colorCode: event.colorCode || '#3B82F6'
        });

        const handleEdit = (e) => {
            e.preventDefault();
            handleUpdateCustomClass(event.dayIndex, event.eventIndex, editForm);
        };

        return (
            <div className="event-details-overlay" onClick={onClose}>
                <div className="event-details-card" onClick={e => e.stopPropagation()}>
                    <div className="event-details-header">
                        <h3>{event.isCustom ? event.title : event.subject}</h3>
                        <button className="close-button" onClick={onClose}>×</button>
                    </div>
                    <div className="event-details-content">
                        {isEditing && event.isCustom ? (
                            <form onSubmit={handleEdit} className="edit-form">
                                <div className="form-group">
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        value={editForm.title}
                                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Task Name</label>
                                    <input
                                        type="text"
                                        value={editForm.taskName}
                                        onChange={(e) => setEditForm({ ...editForm, taskName: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Time</label>
                                    <input
                                        type="time"
                                        value={editForm.time}
                                        onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea
                                        value={editForm.description}
                                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Color</label>
                                    <input
                                        type="color"
                                        value={editForm.colorCode}
                                        onChange={(e) => setEditForm({ ...editForm, colorCode: e.target.value })}
                                    />
                                </div>
                                <div className="form-actions">
                                    <button type="button" onClick={() => setIsEditing(false)} className="cancel-button">
                                        Cancel
                                    </button>
                                    <button type="submit" className="save-button">
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <>
                                <div className="detail-item">
                                    <span className="detail-label">Date</span>
                                    <span>{formatDate(scheduleData.days[event.dayIndex].date)}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Time</span>
                                    <span>{formatTimeWithAMPM(event.time)}</span>
                                </div>
                                {event.isCustom ? (
                                    <>
                                        <div className="detail-item">
                                            <span className="detail-label">Title</span>
                                            <span>{event.title}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Task</span>
                                            <span>{event.taskName}</span>
                                        </div>
                                        {event.description && (
                                            <div className="detail-item">
                                                <span className="detail-label">Description</span>
                                                <span>{event.description}</span>
                                            </div>
                                        )}
                                        <div className="event-actions">
                                            <button
                                                className="edit-button"
                                                onClick={() => setIsEditing(true)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="delete-button"
                                                onClick={() => handleDeleteCustomClass(event.dayIndex, event.eventIndex)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="detail-item">
                                            <span className="detail-label">Subject</span>
                                            <span>{event.subject}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Instructor</span>
                                            <span>{event.instructor}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Location</span>
                                            <span>{event.location}</span>
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <Card className="calendar-card">
            <div className="calendar-header">
                <div className="calendar-controls">
                    <button
                        className="nav-button prev"
                        onClick={() => setWeekOffset(prev => prev - 1)}
                        aria-label="Previous week"
                    >
                        <ChevronLeft />
                    </button>
                    <div className="week-selector">
                        <span className="current-week">{currentWeek}</span>
                    </div>
                    <button
                        className="nav-button next"
                        onClick={() => setWeekOffset(prev => prev + 1)}
                        aria-label="Next week"
                    >
                        <ChevronRight />
                    </button>
                </div>
                <button className="export-button" onClick={handleExport}>
                    Export Schedule
                </button>
            </div>

            {isLoading ? (
                <div className="loading-spinner">Loading...</div>
            ) : error ? (
                <div className="error-message">{error}</div>
            ) : (
                <div className="calendar-grid">
                    {scheduleData?.days.map((dayData, dayIndex) => (
                        dayData = scheduleData?.days[dayIndex] || {
                            day: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'][dayIndex],
                            date: new Date(scheduleData?.startDate).setDate(new Date(scheduleData?.startDate).getDate() + dayIndex),
                            classes: [],
                            customClasses: []
                        },
                        <div key={dayData.day} className="day-column">
                            <div className="day-header">
                                <div className="day-info">
                                    <div className="day-name">{DAY_MAPPING[dayData.day]}</div>
                                    <div className="day-date">{formatDate(dayData.date)}</div>
                                </div>
                                <button
                                    className="add-task-button"
                                    onClick={() => handleCreateClick(dayIndex)}
                                    title="Add custom task"
                                >
                                    +
                                </button>
                            </div>
                            <div className="day-content">
                                {dayData.customClasses?.map((customClass, index) => (
                                    <div
                                        key={`custom-${index}`}
                                        className="event-block custom"
                                        style={{
                                            borderLeftColor: customClass.colorCode || '#3B82F6',
                                            backgroundColor: '#f8fafc'
                                        }}
                                        onClick={() => handleEventClick(customClass, dayIndex, index, true)}
                                    >
                                        <div className="event-time">
                                            {formatTimeWithAMPM(customClass.time)}
                                        </div>
                                        <div className="event-info">
                                            <div className="event-title">{customClass.title}</div>
                                            <div className="event-task">{customClass.taskName}</div>
                                        </div>
                                    </div>
                                ))}

                                {dayData.classes?.map((classItem, index) => (
                                    <div
                                        key={`class-${index}`}
                                        className="event-block regular"
                                        onClick={() => handleEventClick(classItem, dayIndex, index, false)}
                                    >
                                        <div className="event-time">
                                            {formatTimeWithAMPM(classItem.time)}
                                        </div>
                                        <div className="event-info">
                                            <div className="event-title">{classItem.subject}</div>
                                            <div className="event-location">{classItem.location}</div>
                                        </div>
                                    </div>
                                ))}

                                {(!dayData.classes?.length && !dayData.customClasses?.length) && (
                                    <div className="empty-day">No events</div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showEventDetails && (
                <EventDetailsCard
                    event={selectedEvent}
                    onClose={() => setShowEventDetails(false)}
                />
            )}

            {showModal && (
                <CreateClassModal
                    onClose={() => setShowModal(false)}
                    onSave={(customClass) => handleSaveCustomClass(selectedDay, customClass)}
                    selectedDay={selectedDay}
                    dayData={scheduleData.days[selectedDay]}
                />
            )}
        </Card>
    );
};

export default Schedule;