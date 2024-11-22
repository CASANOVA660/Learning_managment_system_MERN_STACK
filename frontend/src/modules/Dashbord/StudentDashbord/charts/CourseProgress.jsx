import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../cards/cardinfo";
import "./CourseProgress.css";

const CourseProgress = () => {
    const subjects = [
        { name: "Mathematics", progress: 85 },
        { name: "Physics", progress: 72 },
        { name: "Computer Science", progress: 90 },
    ];

    return (
        <Card className="course-progress-card">
            <CardHeader>
                <CardTitle>Course Progress</CardTitle>
                <CardDescription>Completion rate by subject</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="subjects-list">
                    {subjects.map((subject, index) => (
                        <div key={index} className="subject-item">
                            <div className="subject-header">
                                <span className="subject-name">{subject.name}</span>
                                <span className="progress-value">{subject.progress}%</span>
                            </div>
                            <div className="progress-bar-container">
                                <div
                                    className="progress-bar"
                                    style={{
                                        width: `${subject.progress}%`,
                                    }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default CourseProgress;