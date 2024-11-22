import React from 'react';
import './Progress.css';

export const Progress = ({ value, className = '' }) => (
    <div className={`course-progress-container ${className}`}>
        <div
            className="course-progress-bar"
            style={{ width: `${value}%` }}
            role="progressbar"
            aria-valuenow={value}
            aria-valuemin="0"
            aria-valuemax="100"
        />
    </div>
);