const mongoose = require('mongoose');

const Klucz = mongoose.model('Klucz', {
    numer: Number,
    blok: String,
    funkcja: String,
    ile: Number, 
});

module.exports = Klucz;