import React from 'react';
import './Avatar.css';

export const Avatar = ({ children, className = '' }) => (
    <div className={`course-avatar ${className}`}>
        {children}
    </div>
);

export const AvatarImage = ({ src, alt, className = '' }) => (
    <img
        src={src}
        alt={alt}
        className={`course-avatar-image ${className}`}
    />
);

export const AvatarFallback = ({ children, className = '' }) => (
    <div className={`course-avatar-fallback ${className}`}>
        {children}
    </div>
);