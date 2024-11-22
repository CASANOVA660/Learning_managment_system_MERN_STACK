const mongoose = require('mongoose');
const Schedule = require('./Model/ScheduleModel');
require('dotenv').config();

const generateTestSchedule = (studentId, weekNumber) => {
    const currentDate = new Date();
    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - currentDate.getDay() + 1);

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);

    return {
        studentId,
        calendarWeek: weekNumber,
        startDate,
        endDate,
        days: [
            {
                day: 'MON',
                date: new Date(startDate),
                classes: [
                    {
                        subject: 'Mathematics',
                        location: 'Room 101',
                        city: 'New York',
                        time: '09:00',
                        instructor: 'Dr. Smith'
                    },
                    {
                        subject: 'Physics',
                        location: 'Room 102',
                        city: 'New York',
                        time: '11:00',
                        instructor: 'Dr. Johnson'
                    }
                ],
                customClasses: []
            },
            // Add more days as needed
        ]
    };
};

const seedSchedule = async () => {
    try {
        await mongoose.connect(process.env.DBURI);

        // Clear existing schedules
        await Schedule.deleteMany({});

        // Create test schedules
        const testSchedules = [
            generateTestSchedule(1001, 1),
            generateTestSchedule(1002, 1),
            // Add more test schedules as needed
        ];

        await Schedule.insertMany(testSchedules);

        console.log('Schedule data seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding schedule data:', error);
        process.exit(1);
    }
};

seedSchedule();