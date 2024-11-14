import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "../../../Dashbord/StudentDashbord/cards/cardinfo"; // Assuming these components are pre-made
import './RecentAnnouncementsCard.css';

// Custom Badge component
const Badge = ({ children, variant }) => (
    <span className={`badge ${variant}`}>{children}</span>
);

// Custom Button component
const Button = ({ children, variant, size, onClick }) => (
    <button className={`btn ${variant} ${size}`} onClick={onClick}>
        {children}
    </button>
);

const RecentAnnouncementsCard = () => (
    <Card className="recent-announcement-card">
        <CardHeader>
            <CardTitle>Recent Announcements</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                <div>
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold">Midterm Schedule Change</h3>
                        <Badge variant="urgent">Urgent</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">The midterm exam for CS101 has been rescheduled.</p>
                    <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-muted-foreground">Posted on July 10, 2023</p>
                        <Button variant="link" size="sm" onClick={() => alert('Redirecting to announcement details')}>
                            Read More
                        </Button>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
);

export default RecentAnnouncementsCard;
