import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../cards/cardinfo"; // Assuming Card components are available
import { Users, Bookmark, CalendarDays } from "lucide-react";

import './AdditionalInfo.css';

const AdditionalInfo = () => {
    const classmatesData = [
        { name: "John Doe", avatar: "", initials: "JD" },
        { name: "Jane Smith", avatar: "", initials: "JS" },
        { name: "Samuel Lee", avatar: "", initials: "SL" },
    ];

    const clubsData = [
        { name: "Math Club", day: "Tuesday", time: "3:00 PM" },
        { name: "Science Club", day: "Thursday", time: "4:00 PM" },
    ];

    const eventsData = [
        { name: "School Play", date: "March 3", location: "Auditorium" },
        { name: "Science Fair", date: "March 10", location: "Gym" },
    ];

    return (
        <div className="additional-info-container">
            <Card className="classmates-card">
                <CardHeader>
                    <CardTitle>Classmates</CardTitle>
                    <CardDescription>Your peers in Advanced Mathematics</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {classmatesData.map((classmate, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <Users className="icon h-6 w-6" />
                                <div>
                                    <p className="font-medium">{classmate.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className="clubs-card">
                <CardHeader>
                    <CardTitle>Clubs</CardTitle>
                    <CardDescription>Your extracurricular activities</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {clubsData.map((club, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <Bookmark className="icon h-6 w-6" />
                                <div>
                                    <p className="font-medium">{club.name}</p>
                                    <p className="text-sm text-muted-foreground">{club.day} at {club.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className="events-card">
                <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                    <CardDescription>School events and activities</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {eventsData.map((event, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <CalendarDays className="icon h-6 w-6" />
                                <div>
                                    <p className="font-medium">{event.name}</p>
                                    <p className="text-sm text-muted-foreground">{event.date} - {event.location}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdditionalInfo;
