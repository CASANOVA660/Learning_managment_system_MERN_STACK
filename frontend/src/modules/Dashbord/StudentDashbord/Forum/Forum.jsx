import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../cards/cardinfo";
import "./Forum.css"; // Styling specific to Forum component

const Forum = () => {
    const forumData = [
        { title: "Homework Help: Algebra", author: "Alice Johnson", replies: 4, views: 200 },
        { title: "Study Tips for Finals", author: "Bob Lee", replies: 10, views: 500 },
        { title: "Science Project Ideas", author: "Cara Chen", replies: 7, views: 300 },
    ];

    return (
        <Card className="forum-card">
            <CardHeader>
                <CardTitle>Student Forum</CardTitle>
                <CardDescription>Discuss and share with your peers</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="forum-topics">
                    {forumData.map((topic, index) => (
                        <div key={index} className="forum-topic">
                            <div>
                                <p className="font-medium">{topic.title}</p>
                                <p className="text-sm text-muted-foreground">Posted by {topic.author}</p>
                            </div>
                            <div className="forum-stats">
                                <span className="mr-4">{topic.replies} replies</span>
                                <span>{topic.views} views</span>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="new-topic-button">New Topic</button>
            </CardContent>
        </Card>
    );
};

export default Forum;
