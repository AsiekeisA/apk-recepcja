const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
    type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required : true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    position: {
        type: String,
        enum: ['student','pracownik','gość','mieszkaniec'],
        required: true,
    },
    nrIndeks: {
        type: String,
        unique: true,
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;