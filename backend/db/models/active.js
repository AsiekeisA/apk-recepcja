const mongoose = require('mongoose');

const ActiveSchema = new mongoose.Schema({
    key_id: {
        type: String,
        // type: mongoose.Schema.ObjectId,
        // ref: 'Key',
        required: true,
    },
    user_id: {
        type: String,
        // type: mongoose.Schema.ObjectId,
        // ref: 'User',
        required: true,
    },
    data: {
        type: Date,
        default: Date.now
    },   
});

const Active = mongoose.model('Active', ActiveSchema);

module.exports = Active;