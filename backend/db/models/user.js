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
        type: Number,
        required: true,
        //unique: true,
    },
    position: {
        type: String,
        // enum: ['student','pracownik','gość','mieszkaniec'],
        required: true,
    },
    nrIndeks: {
        type: Number,
        //unique: true,
        required: true,
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;