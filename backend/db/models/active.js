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
        type: String,
        required: true,
    },
    dataQuit: {
        type: String,
        //required: true,
    },
    live: {
        type: Boolean,
        //required: true,
    },
});

const Active = mongoose.model('Active', ActiveSchema);

module.exports = Active;