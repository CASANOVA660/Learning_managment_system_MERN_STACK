import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../cards/cardinfo";
import { ChevronDown } from "lucide-react";
import { Calendar } from "lucide-react";
import './schedule.css'; // Import the CSS

const Schedule = () => {
    const [selectedDay, setSelectedDay] = useState("Monday");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility

    const scheduleData = {
        Monday: [
            { subject: "Mathematics", time: "9:00 AM - 10:30 AM", room: "Room 101" },
            { subject: "Physics", time: "11:00 AM - 12:30 PM", room: "Room 102" },
        ],
        Tuesday: [
            { subject: "Computer Science", time: "9:00 AM - 10:30 AM", room: "Room 201" },
            { subject: "Chemistry", time: "11:00 AM - 12:30 PM", room: "Room 202" },
        ],
        // Add more days and schedules here...
    };

    return (
        <Card className="schedule-card">
            <CardHeader className="schedule-card-header">
                <CardTitle className="schedule-card-title">Schedule</CardTitle>

                {/* Dropdown button */}
                <div className="dropdown-container">
                    <button
                        className="dropdown-btn"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        {selectedDay} <ChevronDown className="ml-2 h-4 w-4" />
                    </button>

                    {/* Dropdown content */}
                    {isDropdownOpen && (
                        <div className="dropdown-content">
                            <div onClick={() => { setSelectedDay("Monday"); setIsDropdownOpen(false); }}>Monday</div>
                            <div onClick={() => { setSelectedDay("Tuesday"); setIsDropdownOpen(false); }}>Tuesday</div>
                            <div onClick={() => { setSelectedDay("Wednesday"); setIsDropdownOpen(false); }}>Wednesday</div>
                            <div onClick={() => { setSelectedDay("Thursday"); setIsDropdownOpen(false); }}>Thursday</div>
                            <div onClick={() => { setSelectedDay("Friday"); setIsDropdownOpen(false); }}>Friday</div>
                        </div>
                    )}
                </div>
            </CardHeader>

            <CardContent className="schedule-content">
                <div className="space-y-4">
                    {scheduleData[selectedDay]?.map((item, index) => (
                        <div key={index} className="schedule-item">
                            <div className="calendar-icon">
                                <Calendar className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="subject">{item.subject}</p>
                                <p className="time-room">{item.time} - {item.room}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default Schedule;
