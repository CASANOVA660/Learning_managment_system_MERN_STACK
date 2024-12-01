import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import './StudentPerformanceT.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const StudentPerformance = () => {
    const data = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
        datasets: [
            {
                label: 'Class Average',
                data: [75, 78, 76, 82, 80, 85],
                borderColor: '#1a237e',
                tension: 0.4,
            },
            {
                label: 'Top Performers',
                data: [85, 88, 87, 90, 88, 92],
                borderColor: '#4CAF50',
                tension: 0.4,
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Student Performance Trends'
            }
        },
        scales: {
            y: {
                min: 0,
                max: 100
            }
        }
    };

    return (
        <div className="student-performance">
            <h2>Student Performance</h2>
            <div className="chart-container">
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default StudentPerformance;