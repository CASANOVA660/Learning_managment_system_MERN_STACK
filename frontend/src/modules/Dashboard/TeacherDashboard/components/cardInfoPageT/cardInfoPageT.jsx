import React from 'react';
import './cardInfoPageT.css';

const CardInfoPage = () => {
    const cards = [
        {
            title: "Total Students",
            value: "250",
            icon: "👥",
            trend: "+5%",
            color: "#4CAF50"
        },
        {
            title: "Active Courses",
            value: "8",
            icon: "📚",
            trend: "+2",
            color: "#2196F3"
        },
        {
            title: "Assignments",
            value: "45",
            icon: "📝",
            trend: "12 pending",
            color: "#FF9800"
        },
        {
            title: "Average Performance",
            value: "85%",
            icon: "📊",
            trend: "+3%",
            color: "#9C27B0"
        }
    ];

    return (
        <div className="card-info-container">
            {cards.map((card, index) => (
                <div className="info-card" key={index}>
                    <div className="card-icon" style={{ background: card.color }}>
                        {card.icon}
                    </div>
                    <div className="card-content">
                        <h3>{card.title}</h3>
                        <div className="card-value">{card.value}</div>
                        <div className="card-trend">{card.trend}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CardInfoPage;