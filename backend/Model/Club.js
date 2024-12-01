const mongoose = require('mongoose');

const ClubSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['ACADEMIC', 'SPORTS', 'ARTS', 'TECHNOLOGY', 'SOCIAL', 'OTHER'],
        required: true
    },
    icon: String,
    coverImage: String,
    members: [{
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        },
        role: {
            type: String,
            enum: ['ADMIN', 'MODERATOR', 'MEMBER'],
            default: 'MEMBER'
        },
        joinedAt: {
            type: Date,
            default: Date.now
        }
    }],
    events: [{
        title: {
            type: String,
            required: true
        },
        description: String,
        date: {
            type: Date,
            required: true
        },
        location: String,
        attendees: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        }],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    posts: [{
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
            required: true
        },
        content: {
            type: String,
            required: true
        },
        images: [String],
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        }],
        comments: [{
            studentId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student'
            },
            content: String,
            createdAt: {
                type: Date,
                default: Date.now
            }
        }],
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Add indexes for better query performance
ClubSchema.index({ category: 1 });
ClubSchema.index({ 'members.studentId': 1 });
ClubSchema.index({ createdAt: -1 });

const Club = mongoose.model('Club', ClubSchema);

module.exports = Club;