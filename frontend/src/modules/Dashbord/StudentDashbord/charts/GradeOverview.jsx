import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../cards/cardinfo";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts";
import './GradeOverview.css'

// Sample data for grade chart
const gradeData = [
    { subject: "Math", grade: 85 },
    { subject: "Science", grade: 90 },
    { subject: "History", grade: 78 },
    { subject: "English", grade: 92 },
    { subject: "Physical Education", grade: 88 },
];

const COLORS = ["#4CAF50", "#2196F3", "#FF5722", "#FFC107", "#9C27B0"];

const GradeOverview = () => {
    return (
        <Card className="grade-overview-card">
            <CardHeader>
                <CardTitle>Grade Overview</CardTitle>
                <CardDescription>Your performance across subjects</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grade-chart">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={gradeData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="subject" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="grade" fill="hsl(var(--primary))">
                                {gradeData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default GradeOverview;
