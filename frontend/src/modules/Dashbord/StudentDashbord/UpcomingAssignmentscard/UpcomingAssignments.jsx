import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../cards/cardinfo"; // Assuming Card components are already set
import { Book } from "lucide-react"; // Assuming you're using react-feather for the Book icon
import './UpcomingAssignments.css'; // Import the CSS for styling

const UpcomingAssignments = () => {
    return (
        <div className="upcoming-assignments-container">
            <Card className="upcoming-assignments-card">
                <CardHeader>
                    <CardTitle>Upcoming Assignments</CardTitle>
                    <CardDescription>Tasks due soon</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="assignment-list">
                        {/* List of upcoming assignments */}
                        <div className="assignment-item">
                            <div className="assignment-icon">
                                <Book className="icon" />
                            </div>
                            <div className="assignment-details">
                                <p className="assignment-title">Math Problem Set</p>
                                <p className="assignment-due">Due in 2 days</p>
                            </div>
                        </div>
                        <div className="assignment-item">
                            <div className="assignment-icon">
                                <Book className="icon" />
                            </div>
                            <div className="assignment-details">
                                <p className="assignment-title">Physics Lab Report</p>
                                <p className="assignment-due">Due in 4 days</p>
                            </div>
                        </div>
                        <div className="assignment-item">
                            <div className="assignment-icon">
                                <Book className="icon" />
                            </div>
                            <div className="assignment-details">
                                <p className="assignment-title">English Essay</p>
                                <p className="assignment-due">Due in 1 week</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default UpcomingAssignments;
