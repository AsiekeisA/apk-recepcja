const Klucz = require('../../db/models/klucz');

module.exports = {
    zapiszKlucz: function(req,res) {
        const kluczyk = new Klucz({ numer: 306, blok:'B', funkcja:'room', ile:3})
        kluczyk.save().then(() => {
            console.log('Nowy klucz');
        });
    res.send('Strona Główna');
    }
}