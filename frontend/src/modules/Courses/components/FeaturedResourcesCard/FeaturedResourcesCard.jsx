import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../cards/cardinfo"; // Assuming these components are pre-made
import './FeaturedResourcesCard.css'; // Import the normal CSS for styling

const FeaturedResourcesCard = () => (
    <Card className="featured-resource-card">
        <CardHeader>
            <CardTitle>Featured Resources</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="resource-info">
                <div>
                    <h3 className="resource-title">Advanced Calculus Study Guide</h3>
                    <p className="resource-description">Comprehensive review of key concepts</p>
                    <p className="resource-publisher">Published by MIT Press</p>
                </div>
                <button className="download-btn">
                    <svg className="download-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path d="M12 0v12H3.5l3.75 3.75h10l3.75-3.75H12z" /></svg>
                    Download
                </button>
            </div>
            <div className="badges">
                <span className="badge">Most Downloaded</span>
                <span className="badge">Recommended</span>
            </div>
        </CardContent>
    </Card>
);

export default FeaturedResourcesCard;
