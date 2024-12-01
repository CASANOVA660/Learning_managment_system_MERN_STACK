import React, { useState } from 'react';
import './ScheduleT.css';

const Schedule = () => {
    const [currentWeek, setCurrentWeek] = useState(0);
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const timeSlots = ['9:00 AM', '10:30 AM', '1:00 PM', '2:30 PM', '4:00 PM'];

    const schedule = {
        Monday: [
            { time: '9:00 AM', subject: 'Mathematics', class: '10A' },
            { time: '2:30 PM', subject: 'Physics', class: '11B' },
        ],
        Tuesday: [
            { time: '10:30 AM', subject: 'Chemistry', class: '12A' },
            { time: '1:00 PM', subject: 'Mathematics', class: '11A' },
        ],
        // Add more days...
    };

    return (
        <div className="schedule-container">
            <div className="schedule-header">
                <h2>Weekly Schedule</h2>
                <div className="week-navigation">
                    <button onClick={() => setCurrentWeek(prev => prev - 1)}>Previous</button>
                    <span>Week {currentWeek + 1}</span>
                    <button onClick={() => setCurrentWeek(prev => prev + 1)}>Next</button>
                </div>
            </div>
            <div className="schedule-grid">
                <div className="time-column">
                    <div className="grid-header">Time</div>
                    {timeSlots.map((time, index) => (
                        <div className="time-slot" key={index}>{time}</div>
                    ))}
                </div>
                {days.map((day, dayIndex) => (
                    <div className="day-column" key={dayIndex}>
                        <div className="grid-header">{day}</div>
                        {timeSlots.map((time, timeIndex) => {
                            const class_ = schedule[day]?.find(s => s.time === time);
                            return (
                                <div className={`schedule-slot ${class_ ? 'has-class' : ''}`} key={timeIndex}>
                                    {class_ && (
                                        <>
                                            <div className="class-subject">{class_.subject}</div>
                                            <div className="class-info">{class_.class}</div>
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Schedule;