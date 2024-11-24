const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed', 'Late'],
        default: 'Not Started'
    },
    questions: [{
        type: String,
        required: true
    }],
    responses: [{
        studentId: {
            type: Number,
            required: true,
            ref: 'Student'
        },
        answers: [{
            questionIndex: Number,
            text: String,
            submittedAt: {
                type: Date,
                default: Date.now
            }
        }],
        status: {
            type: String,
            enum: ['Submitted', 'Not Submitted'],
            default: 'Not Submitted'
        }
    }],
    courseId: {
        type: Number,
        ref: 'Course',
        required: true
    },
    subjectId: {
        type: Number,
        ref: 'Subject',
        required: true
    },
    teacherId: {
        type: Number,
        ref: 'Teacher',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt timestamp before saving
AssignmentSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Assignment = mongoose.model('Assignment', AssignmentSchema);

module.exports = Assignment;