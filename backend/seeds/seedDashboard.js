const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Dashboard = require('../Model/DashboardModel');

dotenv.config();

// Helper function to generate dates for a week
const generateWeekDates = (weekOffset = 0) => {
    const currentDate = new Date();
    const startDate = new Date(currentDate);

    // Adjust to Monday of the current week
    startDate.setDate(currentDate.getDate() - currentDate.getDay() + 1 + (weekOffset * 7));

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);

    return { startDate, endDate };
};

// Helper function to get week number
const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

// Generate schedule for a specific week
const generateWeekSchedule = (weekOffset = 0) => {
    const { startDate, endDate } = generateWeekDates(weekOffset);
    const calendarWeek = getWeekNumber(startDate);

    const days = [];
    const dayNames = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);

        days.push({
            day: dayNames[i],
            date: currentDate,
            classes: [
                {
                    subject: 'Mathematics',
                    location: '2701 Kansas Ave',
                    city: 'Santa Monica, CA',
                    time: '8:00 AM - 9:30 AM',
                    instructor: 'Dr. Smith'
                },
                {
                    subject: 'Physics',
                    location: '2701 Kansas Ave',
                    city: 'Santa Monica, CA',
                    time: '10:00 AM - 11:30 AM',
                    instructor: 'Dr. Johnson'
                }
            ]
        });
    }

    return {
        calendarWeek,
        startDate,
        endDate,
        days
    };
};

const sampleDashboardData = {
    studentId: 13, // This should match with a student in your database
    schedules: [
        generateWeekSchedule(0),  // Current week
        generateWeekSchedule(1),  // Next week
        generateWeekSchedule(-1)  // Previous week
    ],
    grades: [
        {
            subject: 'Mathematics',
            grade: 85,
            maxGrade: 100
        },
        {
            subject: 'Physics',
            grade: 90,
            maxGrade: 100
        }
    ],
    attendance: [
        {
            date: new Date('2024-03-20'),
            status: 'present',
            subject: 'Mathematics'
        }
    ],
    courseProgress: [
        {
            courseName: 'Advanced Mathematics',
            completedModules: 7,
            totalModules: 10,
            progress: 70
        }
    ],
    achievements: [
        {
            title: 'Perfect Attendance',
            points: 100,
            date: new Date(),
            description: 'Attended all classes for a month'
        }
    ],
    upcomingAssignments: [
        {
            title: 'Calculus Project',
            subject: 'Mathematics',
            dueDate: new Date('2024-03-25'),
            status: 'pending',
            priority: 'high'
        }
    ],
    studyTime: [
        {
            date: new Date(),
            subject: 'Mathematics',
            duration: 120,
            goal: 180
        }
    ]
};

const seedDashboard = async () => {
    try {
        await mongoose.connect(process.env.DBURI);
        console.log('Connected to MongoDB');

        // Clear existing dashboard data
        await Dashboard.deleteMany({});
        console.log('Cleared existing dashboard data');

        // Insert new dashboard data
        await Dashboard.create(sampleDashboardData);
        console.log('Dashboard data seeded successfully');

        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding dashboard data:', error);
        mongoose.connection.close();
    }
};

seedDashboard();