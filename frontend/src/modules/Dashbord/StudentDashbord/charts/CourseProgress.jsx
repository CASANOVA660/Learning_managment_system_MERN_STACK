import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../cards/cardinfo";
import "./CourseProgress.css"; // Ensure the CSS file is imported

const CourseProgress = () => {
    const subjects = [
        { name: "Mathematics", progress: 85 },
        { name: "Physics", progress: 72 },
        { name: "Computer Science", progress: 90 },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Course Progress</CardTitle>
                <CardDescription>Completion rate by subject</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {subjects.map((subject, index) => (
                    <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-sm">{subject.name}</span>
                        </div>
                        <div className="progress-bar-container">
                            <div
                                className="progress-bar"
                                style={{
                                    width: `${subject.progress}%`,
                                }}
                            ></div>
                            <span className="progress-percentage" style={{ left: `${subject.progress}%` }}>
                                {subject.progress}%
                            </span>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

export default CourseProgress;
