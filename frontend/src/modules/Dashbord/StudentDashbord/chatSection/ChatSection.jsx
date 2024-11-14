// ChatSection.jsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../cards/cardinfo";
import './ChatSection.css';

const ChatSection = () => {
    return (
        <div className="chat-section">
            {/* Class Chat */}
            <Card className="chat-card">
                <CardHeader>
                    <CardTitle>Class Chat</CardTitle>
                    <CardDescription>Private chat for Advanced Mathematics</CardDescription>
                </CardHeader>
                <CardContent>
                    <button className="chat-join-button">Join Chat</button>
                </CardContent>
            </Card>

            {/* University Chat */}
            <Card className="chat-card">
                <CardHeader>
                    <CardTitle>University Chat</CardTitle>
                    <CardDescription>Connect with students across campus </CardDescription>
                </CardHeader>
                <CardContent>
                    <button className="chat-join-button">Join Chat</button>
                </CardContent>
            </Card>
        </div>
    );
};

export default ChatSection;
