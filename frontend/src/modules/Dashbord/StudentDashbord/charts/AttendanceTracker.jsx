import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../cards/cardinfo";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import './AttendanceTracker.css';

// Sample data for attendance
const attendanceData = [
    { name: "Present", value: 75 },
    { name: "Absent", value: 25 },
];

// Define custom colors for the pie chart segments
const COLORS = ["#4caf50", "#f44336"];

const AttendanceTracker = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Attendance</CardTitle>
                <CardDescription>Your attendance record</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="pie-chart-container">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={attendanceData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {attendanceData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default AttendanceTracker;
