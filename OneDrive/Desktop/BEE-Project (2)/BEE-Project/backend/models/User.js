const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    isPremium: {
        type: Boolean,
        default: false,
    },
    enrolledCourses: [{
        title: String,
        enrolledAt: {
            type: Date,
            default: Date.now
        }
    }],
    bookmarkedCourses: [{
        title: String,
        bookmarkedAt: {
            type: Date,
            default: Date.now
        }
    }],
});

module.exports = mongoose.model('User', UserSchema);
