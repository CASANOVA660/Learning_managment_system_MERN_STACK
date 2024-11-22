import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../cards/cardinfo";
import './AchievementPoints.css';

const AchievementPoints = () => {
    return (
        <Card className="achievement-points-card">
            <CardHeader>
                <CardTitle>Achievement Points</CardTitle>
                <CardDescription>Total points earned</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="achievement-content">
                    <p className="points-value">2,450</p>
                    <p className="points-description">Points this semester</p>
                    <div className="achievement-progress">
                        <div className="achievement-progress-bar">
                            <div
                                className="achievement-progress-fill"
                                style={{ width: "82%" }}
                            ></div>
                        </div>
                        <p className="progress-text">
                            82% towards next achievement level
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default AchievementPoints;