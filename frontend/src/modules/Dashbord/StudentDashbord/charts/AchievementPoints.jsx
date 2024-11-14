import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../cards/cardinfo"; // Assuming Card components are already set
import './AchievementPoints.css'
const AchievementPoints = () => {
    return (
        <Card className="achievement-card">
            <CardHeader>
                <CardTitle>Achievement Points</CardTitle>
                <CardDescription>Total points earned</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-center">
                    <p className="text-4xl font-bold">2,450</p>
                    <p className="mt-2 text-sm text-muted-foreground">Points this semester</p>
                    <div className="mt-4">
                        {/* Static Progress Bar */}
                        <div className="progress-bar-container">
                            <div className="progress-bar" style={{ width: "82%" }}></div>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                            82% towards next achievement level
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default AchievementPoints;
