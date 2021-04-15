const mongoose = require('mongoose');

const KeySchema = new mongoose.Schema({
    numer: {
        type: Number,
        required: true,
    },
    blok: {
        type: String,
        required: true,
    },
    funkcja: {
        type: String,
        required : true,
    },
    ile: {
        type: Number,
        required: true,
    }
});

const Key = mongoose.model('Key', KeySchema);

module.exports = Key;