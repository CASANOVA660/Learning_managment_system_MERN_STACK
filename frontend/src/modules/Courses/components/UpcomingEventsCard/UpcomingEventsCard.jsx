import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "../../../Dashbord/StudentDashbord/cards/cardinfo"; // Assuming these components are pre-made
import './UpcomingEventsCard.css'; // Import the normal CSS for styling
import { CalendarCheck } from 'lucide-react'; // Import CalendarCheck from lucide-react


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

const UpcomingEventsCard = () => (
    <Card className="upcoming-events-card">
        <CardHeader>
            <CardTitle>Upcoming Events and Deadlines</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                <div>
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold">CS101 Project Submission</h3>
                        <Badge>Assignment</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Due: July 20, 2023 at 11:59 PM</p>
                    <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-muted-foreground">2 days remaining</p>
                        <Button variant="outline" size="sm">
                            <CalendarCheck className="mr-2 h-4 w-4" />
                            Add to Calendar
                        </Button>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
);

export default UpcomingEventsCard;
