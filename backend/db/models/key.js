const mongoose = require('mongoose');

const KeySchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true,
    },
    blok: {
        type: String,
        required: true,
    },
    func: {
        type: String,
        enum:["sala wykładowa", "sala komputerowa", "pokój", "kuchnia", "pokój cichej nauki","pralnia", "inne"],
        required : true,
    },
    howMuch: {
        type: Number,
        required: true,
    },
    
});

const Key = mongoose.model('Key', KeySchema);

module.exports = Key;