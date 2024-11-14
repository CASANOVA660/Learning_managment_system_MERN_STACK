import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../cards/cardinfo";// Assuming Card components are already set
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts"; // Assuming you are using Recharts
import './StudyTimeTracker.css'; // Import the CSS for styling

const studyTimeData = [
    { day: "Monday", hours: 3 },
    { day: "Tuesday", hours: 2.5 },
    { day: "Wednesday", hours: 4 },
    { day: "Thursday", hours: 3 },
    { day: "Friday", hours: 5 },
    { day: "Saturday", hours: 1.5 },
    { day: "Sunday", hours: 2 },
];

const StudyTimeTracker = () => {
    return (
        <div className="study-time-tracker-container">
            <Card className="study-time-tracker-card">
                <CardHeader>
                    <CardTitle>Study Time Tracker</CardTitle>
                    <CardDescription>Hours spent studying per day</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="study-time-container">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={studyTimeData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="hours" fill="hsl(var(--primary))" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default StudyTimeTracker;
