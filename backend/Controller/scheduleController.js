const Schedule = require('../Model/ScheduleModel');

const addCustomClass = async (req, res) => {
    try {
        const { studentId } = req.params;
        const { weekNumber, dayIndex, customClass } = req.body;

        console.log('Received request:', { studentId, weekNumber, dayIndex, customClass });

        let schedule = await Schedule.findOne({
            studentId: parseInt(studentId),
            calendarWeek: weekNumber
        });

        if (!schedule) {
            // If schedule doesn't exist, create a new one
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - startDate.getDay() + (dayIndex + 1));

            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 6);

            schedule = new Schedule({
                studentId: parseInt(studentId),
                calendarWeek: weekNumber,
                startDate,
                endDate,
                days: Array(7).fill().map((_, index) => ({
                    day: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'][index],
                    date: new Date(startDate.getTime() + index * 24 * 60 * 60 * 1000),
                    classes: [],
                    customClasses: []
                }))
            });
        }

        // Add the custom class to the specified day
        schedule.days[dayIndex].customClasses.push(customClass);

        await schedule.save();

        console.log('Saved schedule:', schedule);

        res.status(200).json({
            success: true,
            message: 'Custom class added successfully',
            schedule
        });
    } catch (error) {
        console.error('Error adding custom class:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    addCustomClass
};

const getSchedule = async (req, res) => {
    try {
        const { studentId } = req.params;
        const weekOffset = parseInt(req.query.weekOffset) || 0;

        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + (weekOffset * 7));

        const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
        const weekNumber = Math.ceil(((currentDate - startOfYear) / 86400000 + startOfYear.getDay() + 1) / 7);

        const schedule = await Schedule.findOne({
            studentId,
            calendarWeek: weekNumber
        });

        if (!schedule) {
            return res.status(200).json({
                schedule: null,
                weekNumber,
                startDate: null,
                endDate: null
            });
        }

        // Return formatted schedule data
        const response = {
            schedule: {
                studentId: schedule.studentId,
                calendarWeek: schedule.calendarWeek,
                startDate: schedule.startDate,
                endDate: schedule.endDate,
                days: schedule.days.map(day => ({
                    day: day.day,
                    date: day.date,
                    classes: day.classes || [],
                    customClasses: day.customClasses || []
                }))
            },
            weekNumber: schedule.calendarWeek,
            startDate: schedule.startDate,
            endDate: schedule.endDate
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




const updateCustomClass = async (req, res) => {
    try {
        const { studentId } = req.params;
        const { weekNumber, dayIndex, eventIndex, customClass } = req.body;

        const schedule = await Schedule.findOne({
            studentId,
            calendarWeek: weekNumber
        });

        if (!schedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }

        schedule.days[dayIndex].customClasses[eventIndex] = customClass;
        await schedule.save();

        res.status(200).json({
            message: 'Custom class updated successfully',
            schedule
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteCustomClass = async (req, res) => {
    try {
        const { studentId } = req.params;
        const { weekNumber, dayIndex, eventIndex } = req.body;

        const schedule = await Schedule.findOne({
            studentId,
            calendarWeek: weekNumber
        });

        if (!schedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }

        schedule.days[dayIndex].customClasses.splice(eventIndex, 1);
        await schedule.save();

        res.status(200).json({
            message: 'Custom class deleted successfully',
            schedule
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getCurrentClass = async (req, res) => {
    try {
        const { studentId } = req.params;
        const { day, time } = req.query;

        // Find the current schedule
        const schedule = await Schedule.findOne({
            studentId: parseInt(studentId),
            'days.day': day
        });

        if (!schedule) {
            return res.status(200).json({
                currentClass: null,
                nextClass: null,
                attendance: 0
            });
        }

        const currentDay = schedule.days.find(d => d.day === day);

        // Find current class
        const currentClass = findCurrentClass(currentDay, time);

        // Find next class
        const nextClass = findNextClass(currentDay, time);

        // Get attendance statistics
        const attendance = await calculateAttendance(studentId, currentClass?.subject);

        res.status(200).json({
            currentClass,
            nextClass,
            attendance
        });

    } catch (error) {
        console.error('Error getting current class:', error);
        res.status(500).json({ message: error.message });
    }
};

const findCurrentClass = (day, currentTime) => {
    if (!day || !day.classes) return null;

    return day.classes.find(classItem => {
        const [classStart] = classItem.time.split(' - ');
        const [classEnd] = classItem.time.split(' - ')[1];
        return isTimeBetween(currentTime, classStart, classEnd);
    });
};

const findNextClass = (day, currentTime) => {
    if (!day || !day.classes) return null;

    return day.classes.find(classItem => {
        const [classStart] = classItem.time.split(' - ');
        return classStart > currentTime;
    });
};

const calculateAttendance = async (studentId, subject) => {
    // Implement attendance calculation logic
    // This could be based on a separate attendance collection
    return 85; // Placeholder return
};

const isTimeBetween = (current, start, end) => {
    const curr = new Date(`1970/01/01 ${current}`);
    const s = new Date(`1970/01/01 ${start}`);
    const e = new Date(`1970/01/01 ${end}`);
    return curr >= s && curr <= e;
};



module.exports = {
    getCurrentClass,
    getSchedule,
    addCustomClass,
    updateCustomClass,
    deleteCustomClass
};