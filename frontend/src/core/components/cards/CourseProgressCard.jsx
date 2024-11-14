import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CourseProgressCard.css'

function CourseProgressCard({ completedCourses, totalCourses }) {
    const progressPercentage = (completedCourses / totalCourses) * 100;

    return (
        <div className="card p-4 shadow-sm course-progress-card">
            <h5 className="card-title">Enrolled Courses</h5>
            <div className="progress my-3" style={{ height: '20px' }}>
                <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: `${progressPercentage}%` }}
                    aria-valuenow={completedCourses}
                    aria-valuemin="0"
                    aria-valuemax={totalCourses}
                >
                    {completedCourses}/{totalCourses} Completed
                </div>
            </div>
            <div className="progress-line">
                {Array.from({ length: totalCourses }).map((_, index) => (
                    <div
                        key={index}
                        className={`progress-section ${index < completedCourses ? 'completed' : ''}`}
                    ></div>
                ))}
            </div>
        </div>
    );
}

export default CourseProgressCard;
