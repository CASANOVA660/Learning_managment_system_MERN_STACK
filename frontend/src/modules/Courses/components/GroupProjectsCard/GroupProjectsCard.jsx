import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "../../../Dashbord/StudentDashbord/cards/cardinfo";
import { MessageSquare } from 'lucide-react'; // Importing MessageSquare from lucide-react
import './GroupProjectsCard.css';


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

const GroupProjectsCard = () => (
    <Card className="group-projects-card">
        <CardHeader>
            <CardTitle>Group Projects and Collaboration</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                <div>
                    <h3 className="font-semibold">Data Structures Final Project</h3>
                    <p className="text-sm text-muted-foreground">Group Members: Alice, Bob, Charlie</p>
                    <div className="flex items-center justify-between mt-2">
                        <Badge variant="outline">In Progress</Badge>
                        <Button variant="outline" size="sm">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Group Chat
                        </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Next Meeting: July 18, 2023 at 3:00 PM</p>
                </div>
            </div>
        </CardContent>
    </Card>
);

export default GroupProjectsCard;
