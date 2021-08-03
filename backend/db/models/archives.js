const mongoose = require('mongoose');

const ArchivesSchema = new mongoose.Schema({
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
        required: true,
    },
});

const Archives = mongoose.model('Archives', ArchivesSchema);

module.exports = Archives;