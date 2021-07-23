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
        // enum:["sala wykładowa", "sala komputerowa", "pokój", "kuchnia", "pokój cichej nauki","pralnia", "inne"],
        required : true,
    },
    ile: {
        type: Number,
        required: true,
    },
    ileDost: {
        type: Number,
        required: true,
    },
    czyDost: {
        type: Boolean,
        required: true,
    },
    
});

const Key = mongoose.model('Key', KeySchema);

module.exports = Key;