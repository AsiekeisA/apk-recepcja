const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
       sparse: true,
       unique: true,
    },
    phone: {
        type: String,
        trim: true,
        //required: true,
       sparse: true,
       unique: true,
    },
    position: {
        type: String,
        trim: true,
        required: true,
    },
    nrIndeks: {
        type: String,
        trim: true,
        sparse: true,
        unique: true,
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;