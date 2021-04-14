const mongoose = require('mongoose');

const Key = mongoose.model('Key', {
    numer: Number,
    blok: String,
    funkcja: String,
    ile: Number, 
});

module.exports = Key