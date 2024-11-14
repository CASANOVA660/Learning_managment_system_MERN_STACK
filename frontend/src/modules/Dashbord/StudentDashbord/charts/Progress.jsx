// Progress.jsx
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../cards/cardinfo";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";
import './Progress.css'

// Sample data for progress chart
const progressData = [
    { week: "Week 1", progress: 50 },
    { week: "Week 2", progress: 60 },
    { week: "Week 3", progress: 70 },
    { week: "Week 4", progress: 80 },
    { week: "Week 5", progress: 90 },
    { week: "Week 6", progress: 95 },
];

const Progress = () => {
    return (
        <Card className="progress-card">
            <CardHeader>
                <CardTitle>Progress Overview</CardTitle>
                <CardDescription>Your learning progress over time</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="progress-chart">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={progressData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="week" />
                            <YAxis />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="progress"
                                stroke="#000000"
                                strokeWidth={2}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default Progress;
